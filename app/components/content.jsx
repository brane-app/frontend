import React from "react"
import {
    ScrollView,
    View,
} from "react-native"

import AutoHeightImage from "react-native-auto-height-image"

import style_content from "../style/component/content"

const style = {
    content: style_content,
}

const PLACEHOLDER = "https://placekitten.com/500/300"

class Content extends React.Component {
    constructor(opts) {
        super(opts)
        this.content = opts.content
        this.screen_width = opts.screen_width
        this.state = { ...this.state, file_url: "" }
    }

    componentDidMount() {
        this.content.file_url.then( it => this.setState({ file_url: it }) )
    }

    get file_url() {
        return this.state.file_url
    }

    get author() {
        return (
            <View/>
        )
    }

    get image() {
        return (
            <AutoHeightImage
                source = {{ uri: this.file_url || PLACEHOLDER }}
                style = {[ style.content.image ]}
                width = { this.screen_width }/>
        )
    }

    render() {
        return (
            <ScrollView
                style = {[ style.content.contain_image ]}
                contentContainerStyle = {[ style.content.contain_image_container ]}>
                { this.author }
                { this.image }
            </ScrollView>
        )
    }
}

export default Content
