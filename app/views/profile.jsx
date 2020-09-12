import React from "react"
import {
    Image,
    View,
    Text,
} from "react-native"

import imonke from "imonke"

import HeadedView from "../components/headed_view"
import global_state from "../state"
import style_generic from "../style/generic"
import style_profile from "../style/views/profile"

const style = {
    generic: style_generic,
    profile: style_profile,
}


class ProfileCard extends React.Component {
    constructor(opts = {}) {
        super()

        this.client = opts.client
        this.state = {
            client_data: null
        }
    }

    async componentDidMount() {
        this.setState({
            client_data: await this.client.data
        })
    }

    get client_data() {
        return this.state.client_data
    }

    get loaded() {
        return [
            this.client_data,
        ].every(it => it)
    }

    get loading_view() {
        return (
            <>
            </>
        )
    }

    get profile_image() {
        return (
            // We don't have pfp's yet :(
            // But we will soon
            <Image style = {style.profile.image}/>
        )
    }

    get since() {
        return (
            <View style = {style.profile.since_contain}>
                <Text style = {[style.generic.text_ui, style.profile.since]}>
                    {"Joined MM/YY"}
                </Text>
            </View>
        )
    }

    get info() {
        return (
            <>
            <View style = {style.profile.info}>
                <View style = {style.profile.nick_contain}>
                    <Text style = {[style.generic.text_ui, style.profile.nick]}>
                        {this.client_data.nick}
                    </Text>
                </View>
                <View style = {style.profile.stats_contain}>
                    {this.stat("subscribers", this.client_data.subscriber_count)}
                    {this.stat("subscriptions", this.client_data.subscription_count)}
                    {this.stat("posts", this.client_data.post_count)}
                </View>
            </View>
            </>
        )
    }

    get loaded_view() {
        return (
            <>
            <View style = {style.profile.info_contain}>
                {this.profile_image}
                {this.info}
            </View>
            {this.since}
            </>
        )
    }

    stat(label, data) {
        return (
            <View style = {style.profile.stat}>
                <Text style = {[style.generic.text_ui, style.profile.stat_data]}>
                    {data}
                </Text>
                <Text style = {[style.generic.text_ui, style.profile.stat_label]}>
                    {label}
                </Text>
            </View>

        )
    }

    render() {
        return (
            <View style = {style.profile.card_contain}>
                {this.loaded ? this.loaded_view : this.loading_view}
            </View>
        )
    }
}

class ProfileContent extends React.Component {
    constructor(opts = {}) {
        super()

        this.client = opts.client
        this.state = {
            content_generator: null
        }
    }

    get content() {
        return this.state.content_generator
    }

    get loading_view() {
        return (
            <View style = {style.profile.content_loading}>
                <Text style = {style.profile.content_loading_text}>
                    {"I know, I know. It's on the way"}
                </Text>
            </View>
        )
    }

    get loaded_view() {
        return
    }

    render() {
        return (
            <View style = {style.profile.content_contain}>
                {this.loaded ? this.loaded_view : this.loading_view}
            </View>
        )
    }
}

class ProfileView extends HeadedView {
    constructor(opts = {}) {
        super(opts)

        this.state = {
            ...this.state,
            name: "profile",
        }
        this.client = opts.client || global_state.client
    }

    async componentDidMount() {
        this.setState({
            name: await this.client.nick
        })
    }

    get name() {
        return this.state.name
    }

    get profile_card() {
        return <ProfileCard client = {this.client}/>
    }

    get profile_content() {
        return <ProfileContent client = {this.client}/>
    }

    get content () {
        return (
            <View style = {[style.generic.view, style.profile.profile_view]}>
                {this.profile_card}
                {this.profile_content}
            </View>
        )
    }
}

export default ProfileView
