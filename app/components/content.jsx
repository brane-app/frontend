import React from "react"
import {
    ScrollView,
    Text,
    View,
} from "react-native"
import AutoHeightImage from "react-native-auto-height-image"
import AuthorHeader from "./author_header"

const style = {
    content: require("../style/component/content").default,
}

const PLACEHOLDER = "https://placekitten.com/500/300"

class Content extends React.Component {
    constructor(opts = {}) {
        super(opts)
        this.state = { ...this.state, file_url: "", author: undefined }
        this.content = opts.content
        this.screen_width = opts.screen_width
    }

    componentDidMount() {
        this.content.file_url.then( it => this.setState({ file_url: it }) )
        this.content.author.then( it => this.setState({ author: it}) ) //this.setState({ author: it}) )
    }

    get file_url() {
        return this.state.file_url
    }

    get author() {
        return this.state.author
    }

    get author_header() {
        if (!this.author) {
            return
        }

        return <AuthorHeader user = { this.author }/>
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
                { this.author_header }
                { this.image }
            </ScrollView>
        )
    }
}

export default Content
