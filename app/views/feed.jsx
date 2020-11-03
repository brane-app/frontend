import React from "react"
import {
    View,
    Text,
} from "react-native"

import imonke from "imonke"

import HeadedView from "../components/headed_view"
import global_state from "../state"
import style_generic from "../style/generic"

const style = {
    generic: style_generic,
}

class FeedView extends HeadedView {
    constructor(opts = {}) {
        super(opts)
        this.client = opts.client || global_state.client
    }

    get name() {
        return "feed"
    }

    get content() {
        return (
            <View style = {[style.generic.view]}>
                <Text>
                    {"hello, world"}
                </Text>
            </View>
        )
    }
}

class NewFeedView extends FeedView {
    constructor(opts = {}) {
        super(opts)
        this.feed = new imonke.Feed( {feed: "new"} )
    }

    get name() {
        return "new"
    }
}

module.exports = {
    FeedView,
    NewFeedView,
}
