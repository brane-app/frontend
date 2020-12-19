import React from "react"
import {
    Image,
    Text,
    View,
} from "react-native"

const style = {
    ui: require("../style/component/ui").default,
    author_header: require("../style/component/author_header").default,
}

class AuthorHeader extends React.Component {
    constructor(opts = {}) {
        super(opts)
        this.state = { ...this.state, user_nick: null }
        this.user = opts.user
    }

    componentDidMount() {
        this.user.data.then(it => this.setState({ user_nick: it.nick }))
    }

    get user_nick() {
        return this.state.user_nick
    }

    get image() {
        return (
            <Image style = { style.author_header.image }/>
        )
    }

    get text() {
        return (
            <View style = {[ style.ui.vertical_center ]}>
                <Text style = {[ style.ui.text_light, style.author_header.text ]}>
                    { this.user_nick || "" }
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View { ...this.props } style = {[ this.props.style, style.author_header.contain ]}>
                { this.image }
                { this.text }
            </View>
        )
    }
}

export default AuthorHeader
