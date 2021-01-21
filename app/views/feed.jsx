import React from "react"
import { View, Text } from "react-native"
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview"

import imonke from "imonke"

import HeadedView from "../components/headed_view"
import Content from "../components/content"

const style = {
    feed: require("../style/views/feed").default,
    generic: require("../style/generic").default,
}

class FeedView extends HeadedView {
    constructor(opts = {}) {
        super(opts)
        this.chunk = 10
        this.head = ""
        this.layout_provider = new LayoutProvider(
            (index) => { return 0 }, // idk it's just images bro
            (type, it) => {
                it.height = 400
                it.width = this.screen_width
            }
        )
        this.row_renderer = this.row_renderer.bind(this)

        this.data_provider = new DataProvider((it, next) => { it == next })
        this.state = {
            ...this.state, buffer: [], screen_width: 1080,
            data_provider_state: null, terminated: false,
        }
    }

    get name() {
        return "Feed"
    }

    get buffer() {
        return this.state.buffer
    }

    get screen_width() {
        return this.state.screen_width
    }

    get data_provider_state() {
        return this.state.data_provider_state
    }

    get terminated() {
        return this.state.terminated
    }

    get scroll_view_props() {
        return {
            showsVerticalScrollIndicator: false,
        }
    }

    async grow_buffer() {
        if (this.terminated) {
            return
        }

        const fetched = await this.feed.get({
            size: this.chunk,
            before: this.head,
        })

        if (fetched.length === 0) {
            this.set_state_safe({ terminated: true })
            return
        }

        const grown = [...this.buffer, ...fetched]

        this.head = await fetched[fetched.length - 1].id
        this.set_state_safe({
            buffer: [...this.buffer, ...fetched],
            data_provider_state: this.data_provider.cloneWithRows(grown)
        })
    }

    async reset() {
        this.set_state_safe({
            buffer: [],
            data_provider_state: null,
            terminated: false,
        })
    }

    row_renderer(_, it) {
        return (
            <Content
                content = { it }
                screen_width = { this.screen_width }
                key = { it._data ? it._data.id : `${Math.random()}` }/>
        )
    }

    get scroller() {
        if (this.data_provider_state === null) {
            this.grow_buffer()
            return null
        }

        return (
            <RecyclerListView
                onEndReached = { () => this.grow_buffer() }
                onEndReachedThreshold = { 300 }
                onLayout = { event => this.set_state_safe(
                    {screen_width: event.nativeEvent.layout.width}
                ) }
                forceNonDeterministicRendering = { true }
                dataProvider = { this.data_provider_state }
                layoutProvider = { this.layout_provider }
                renderFooter = { this.footer_render }
                rowRenderer = { this.row_renderer }
                scrollViewProps = { this.scroll_view_props}
                style = { style.feed.image_scroller }/>
        )
    }

    get footer_render() {
        const text = this.terminated ? "You've reached the end" : "Getting more content..."
        return () => (
            <View
                style = {[ style.generic.center_padded(16) ]}>
                <Text
                    style = {[ style.generic.text_light_ui ]}>
                    { text }
                </Text>
            </View>
        )
    }

    get content() {
        return (
            <View
                style = {[style.generic.view]}>
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
