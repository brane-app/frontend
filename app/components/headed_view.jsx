import React from "react"
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
} from "react-native"

const style = {
    generic: require("../style/generic").default,
    headed_view: require("../style/component/headed_view").default,
    nav_modal: require("../style/component/nav_modal").default,
    cross: require("../style/drawing/cross").default,
    ui: require("../style/component/ui").default,
}

class Close extends React.Component {
    constructor(opts = {}) {
        super(opts)
        this._onPress = opts.onPress || (() => {})
    }

    get style() {
        return [
            style.cross.cross,
            {
                transform: [
                    {rotate: "45deg"},
                ],
            }
        ]
    }

    render() {
        return (
            <View style = {this.style}>
                <View style = {style.cross.horizontal_line}/>
                <View style = {style.cross.vertical_line}/>
            </View>
        )
    }
}

class NavButton extends React.Component {
    constructor (opts = {}) {
        super(opts)
        this._text = opts.text || ""
        this._onPress = opts.onPress || (() => {})
    }

    render () {
        return (
            <TouchableOpacity
                onPress = {this._onPress}
                style = {style.nav_modal.button}>
                <Text style = {[style.generic.text_ui, style.nav_modal.text]}>
                    {this._text}
                </Text>
            </TouchableOpacity>
        )
    }
}

class HeadedView extends React.Component {
    constructor(opts) {
        super(opts)
        this.state = {modal_visible: false}
        this.mounted = true
    }

    get modal_visible () {
        return this.state.modal_visible
    }

    set modal_visible (value) {
        this.set_state_safe({
            modal_visible: value
        })
    }

    get status_bar_blank() {
        return <View style = {[ style.headed_view.status_bar_blank ]}/>
    }

    get header() {
        return (
            <TouchableOpacity
                style = {style.headed_view.header}
                onPress = {() => {this.modal_visible = true}}>
                <View style = { style.ui.vertical_center }>
                    <View style = { style.ui.horizontal_center }>
                        <Text style = {[style.generic.text_ui, style.headed_view.text]}>
                            {this.name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    get content () {
        return <View/>
    }

    get nav_close () {
        return (
            <TouchableOpacity
                onPress = {() => {this.modal_visible = false}}
                style = {style.nav_modal.close}>
                <Close/>
            </TouchableOpacity>
        )
    }

    get nav_buttons () {
        return (
            <>
            <NavButton
                text = { "All" }
                onPress = { this.navigate_to("feed_all") }/>
            <NavButton
                text = { "Profile" }
                onPress = { this.navigate_to("profile") }/>
            <NavButton
                text = { "Upload Content" }
                onPress = { this.navigate_push("create") }/>
            </>
        )
    }

    get nav_modal () {
        return (
            <Modal
                transparent = {true}
                visible = {this.modal_visible}>
                <TouchableOpacity
                    onPress = {() => {this.modal_visible = false}}
                    activeOpacity = {1}
                    style = {style.nav_modal.dim}>
                    <View style = {style.nav_modal.contain}>
                        {this.nav_close}
                        {this.nav_buttons}
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    componentWillUnmount() {
        this.mounted = false
    }

    async set_state_safe(state, callback) {
        this.mounted && this.setState(state, callback)
    }

    navigate_to(where) {
        return () => {
            this.modal_visible = false
            this.props.navigation.replace(where)
        }
    }

    navigate_push(where) {
        return () => {
            this.modal_visible = false
            this.props.navigation.push(where)
        }
    }

    render () {
        return (
            <View style = {style.headed_view.contain}>
                { this.status_bar_blank }
                { this.nav_modal }
                { this.header }
                <View style = { style.headed_view.content_contain }>
                    { this.content }
                </View>
            </View>
        )
    }
}

export default HeadedView
