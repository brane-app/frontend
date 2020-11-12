import React, { useRef } from "react"
import {
    Animated,
    View,
    ScrollView,
} from "react-native"
import AutoHeightImage from "react-native-auto-height-image"

import imonke from "imonke"

import HeadedView from "../components/headed_view"
import global_state from "../state"
import style_generic from "../style/generic"
import style_feed from "../style/views/feed"

const style = {
    generic: style_generic,
    feed: style_feed,
}

const debug_pool = [
    "https://placekitten.com/600/300",
    "https://placekitten.com/600/600",
    "https://placekitten.com/600/1600",
    "https://placekitten.com/420/1500",
    "https://placekitten.com/520/400",
    "https://placekitten.com/590/400",
    "https://placekitten.com/620/300",
    "https://placekitten.com/690/300",
    "https://placekitten.com/620/600",
    "https://placekitten.com/690/600",
    "https://placekitten.com/620/1600",
    "https://placekitten.com/690/1600",
]

class FeedView extends HeadedView {
    constructor(opts = {}) {
        super(opts)
        this.border = 1
        this.chunk = 2
        this.head = ""
        this.client = opts.client || global_state.client
        this.state = {
            ...this.state,
            screen_width: 0, screen_offset: 0,
            index: 0, buffer: [],
        }
    }

    get name() {
        return "feed"
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

    get buffer_index() {
        return this.state.buffer_index
    }

    get buffer() {
        return this.state.buffer
    }

    image_of(uri) {
        return (
            <ScrollView
                key = {uri}
                style = {[style.feed.contain_image]}
                contentContainerStyle = {[style.feed.contain_image_container]}>
                <AutoHeightImage
                    source = {{uri}}
                    style = {[style.feed.image]}
                    width = {this.screen_width}/>
            </ScrollView>
        )
    }

    image_at(index) {
        return this.image_of(this.buffer[uri])
    }

    get current() {
        return this.image_at(this.index)
    }

    get prev() {
        return this.image_at(this.index - 1)
    }

    get next() {
        return this.image_at(this.index + 1)
    }

    async grow_buffer() {
        if (this.index < this.buffer.length - this.border) {
            return
        }

        let fetched = await this.feed.get({
            size: this.chunk,
            before: this.head,
        })

        // TODO: race condition?
        this.head = await fetched[fetched.length - 1].id
        this.setState({
            buffer: [...this.buffer, ...(await Promise.all(fetched.map(it => it.file_url)))]
        })
    }

    handle_scroll(offset) {
        let snapped = Math.trunc((offset + this.screen_width) % this.screen_width) == 0
        let movement = Math.round((offset - this.screen_offset) / this.screen_width)

        if (!snapped || Math.abs(movement) == 0) {
            return
        }

        this.setState({
            ...this.state,
            screen_offset: offset,
            index: this.index + movement,
        }, () => { this.grow_buffer() })
    }

    get content() {
        return (
            <View
                onLayout = {() => { this.grow_buffer() }}
                style = {[style.generic.view]}>
                <ScrollView
                    ref = { scroll_view => this.scroll_view = scroll_view }
                    onLayout = { event => this.setState({ ...this.state, screen_width: event.nativeEvent.layout.width }) }
                    onScroll = { event => this.handle_scroll(event.nativeEvent.contentOffset.x) }
                    contentContainerStyle = {[style.feed.contain_image_container]}
                    horizontal = {true}
                    pagingEnabled
                    scrollEventThrottle = {1}
                    style = {[style.feed.image_scroller]}>
                        {this.buffer.map(it => this.image_of(it))}
                </ScrollView>
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

module.exports = {
    FeedView,
    AllFeedView,
}
