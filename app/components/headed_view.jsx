import React from "react"
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
} from "react-native"

import style_generic from "../style/generic"
import style_headed_view from "../style/component/headed_view"
import style_nav_modal from "../style/component/nav_modal"
import style_cross from "../style/drawing/cross"

const style = {
    generic: style_generic,
    headed_view: style_headed_view,
    nav_modal: style_nav_modal,
    cross: style_cross
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

    get header() {
        return (
            <View style = {style.headed_view.header}>
                <TouchableOpacity
                    style = {style.headed_view.header_contain}
                    onPress = {() => {this.modal_visible = true}}>
                    <Text style = {[style.generic.text_ui, style.headed_view.text]}>
                        {this.name}
                    </Text>
                </TouchableOpacity>
            </View>
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
                {this.nav_modal}
                {this.header}
                <View style = {style.headed_view.content_contain}>
                    {this.content}
                </View>
            </View>
        )
    }
}

export default HeadedView
