import React, { useRef } from "react"
import {
    Animated,
    View,
    ScrollView,
} from "react-native"

import imonke from "imonke"

import HeadedView from "../components/headed_view"
import Content from "../components/content"
import global_state from "../state"
import style_generic from "../style/generic"
import style_feed from "../style/views/feed"

const style = {
    generic: style_generic,
    feed: style_feed,
}

class FeedView extends HeadedView {
    constructor(opts = {}) {
        super(opts)
        this.border = 3
        this.chunk = 30
        this.head = ""
        this.tail = ""
        this.client = opts.client || global_state.client
        this.state = {
            ...this.state,
            screen_width: 0, screen_offset: 0,
            index: 0, buffer: [], drawable_buffer: []
        }
    }

    get name() {
        return "Feed"
    }

    get screen_width() {
        return this.state.screen_width
    }

    get screen_offset() {
        return this.state.screen_offset
    }

    get index() {
        return this.state.index
    }

    get buffer() {
        return this.state.buffer
    }

    get drawable_buffer() {
        return this.state.drawable_buffer
    }

    async reset() {
        this.set_state_safe({ buffer: [], drawable_buffer: [] }, () => this.grow_buffer())
    }

    async grow_buffer() {
        if (this.index < this.buffer.length - this.border) {
            return
        }

        let fetched = await this.feed.get({
            size: this.chunk,
            before: this.head,
        })
        let buffer = [...this.buffer, ...fetched]
        let drawable_buffer = [
            ...this.drawable_buffer,
            ...fetched.map(it => (
                <Content
                    content = {it}
                    screen_width = {this.screen_width}
                    key = {`${Math.random()}`}/>
            ))
        ]

        this.head = fetched.length == 0 ? "" : await fetched[fetched.length - 1].id
        this.set_state_safe({
            buffer: [...this.buffer, ...fetched],
            drawable_buffer: drawable_buffer,
        })
    }

    async handle_scroll(offset) {
        let snapped = Math.trunc((offset + this.screen_width) % this.screen_width) == 0
        let movement = Math.round((offset - this.screen_offset) / this.screen_width)

        if (!snapped || Math.abs(movement) == 0) {
            return
        }

        this.set_state_safe({
            ...this.state,
            screen_offset: offset,
            index: this.index + movement,
        }, () => { this.grow_buffer() })
    }

    get scroller() {
        return (
            <ScrollView
                style = {[style.feed.image_scroller]}
                onLayout = { event => this.set_state_safe({ screen_width: event.nativeEvent.layout.width }) }
                onScroll = { event => this.handle_scroll(event.nativeEvent.contentOffset.x) }>
                {this.drawable_buffer}
            </ScrollView>
        )
    }

    get content() {
        return (
            <View
                style = {[style.generic.view]}
                onLayout = {() => { this.grow_buffer() }}>
                {this.scroller}
            </View>
        )
    }
}

class AllFeedView extends FeedView {
    constructor(opts = {}) {
        super(opts)
        this.feed = new imonke.Feed( {feed: "all"} )
    }

    get name() {
        return "All"
    }

}

export { FeedView, AllFeedView }
