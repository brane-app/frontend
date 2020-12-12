import { Client } from "imonke"
import React from "react"
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"

import HeadedView from "../components/headed_view"
import TalkingButton from "../components/talking_button"
import ValidInput from "../components/valid_input"
import global_state from "../state"
import colors from "../values/colors"

const style = {
    generic: require("../style/generic").default,
    login: require("../style/views/login").default
}

const nick_regex = /^[A-Za-z0-9.\-_]+$/
const email_regex = /^[^@]+@[^@]+$/

class LoginView extends HeadedView {
    constructor(opts = {}) {
        super(opts)
        this.state = { ...this.state, login: false, submit_disabled: false }

        this.client = new Client()
        this.input_nick = null
        this.input_email = null
        this.input_password = null
        this.submit_button_ref = null
    }

    async display(message) {
        this.submit_button_ref.set_say_color(message, colors.red, { time: 2000 })
    }

    async display_err(err) {
        if (err.response && err.response.data && err.response.data.error) {
            this.display(err.response.data.error)
        } else {
            this.display("network error")
        }
    }

    async valid(fields) {
        return fields
            .map(it => this[`input_${it}`])
            .every(it => it.valid && it.value.length != 0)
    }

    async entries(fields) {
        return Object.fromEntries(
            fields.map(it => [ it, this[`input_${it}`].value ])
        )
    }

    async submit_login() {
        const fields = [ "email", "password" ]
        if (!await this.valid(fields)) {
            return
        }

        if ( await this.client.login(await this.entries(fields)) ) {
            return true
        } else {
            this.display("bad credentials")
        }

        return false
    }

    async submit_register() {
        const fields = [ "nick", "email", "password" ]
        if (!await this.valid(fields)) {
            return
        }

        if( await this.client.create(await this.entries(fields)) ) {
            return true
        }
    }

    async submit() {
        this.setState(
            { submit_disabled: true },
            async () => {
                try {
                    if (this.login ? await this.submit_login() : await this.submit_register()) {
                        global_state.client = this.client
                        this.props.navigation.replace("profile")
                    }
                } catch (err) {
                    this.display(`failed to ${this.login ? "login" : "register"}`)
                } finally {
                    this.setState({ submit_disabled: false })
                }

            }
        )
    }

    get login() {
        return this.state.login
    }

    get submit_disabled() {
        return this.state.submit_disabled
    }

    get header() {
        return null
    }

    get top() {
        return (
            <View style = { style.login.top_contain }>
                <TouchableOpacity
                    onPress = { () => this.setState({ login: false }) }
                    style = {[style.login.top_switcher, this.login ? {} : style.login.top_switcher_underline]}>
                    <Text style = {[ style.generic.text_ui, style.login.button_text ]}>
                    {"register"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = { () => this.setState({ login: true }) }
                    style = {[style.login.top_switcher, this.login ? style.login.top_switcher_underline : {}]}>
                    <Text style = {[ style.generic.text_ui, style.login.button_text ]}>
                        {"login"}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    get inputs() {
        return (
            <View style = { style.login.input_contain }>
                {
                    this.login ? null : <ValidInput
                        ref = { (ref) => { this.input_nick = ref } }
                        name = { "nick" }
                        key = { "nick" }
                        autoCompleteType = { "off" }
                        returnKeyType = { "next" }
                        onSubmitEditing = { () => this.input_email.focus() }
                        style = {[  style.generic.text_field_ui, style.login.input ]}
                        validator = { async (it) => {
                            if (!nick_regex.test(it)) {
                                return [ false, `${it} is invalid` ]
                            }

                            if (16 < it.length) {
                                return [ false, `${it} is too long (${it.length} > 64)` ]
                            }

                            if (it.length < 4) {
                                return [ false, `${it} is too short (${it.length} < 4)` ]
                            }

                            if ( !this.login && await this.client.nick_exists(it) ) {
                                return [ false, `${it} is occupied` ]
                            }

                            return [ true, null ]
                        } }/>
                }
                <ValidInput
                    ref = { (ref) => { this.input_email = ref } }
                    name = { "email" }
                    key = { "email" }
                    autoCompleteType = { "email" }
                    returnKeyType = { "next" }
                    onSubmitEditing = { () => this.input_password.focus() }
                    style = {[  style.generic.text_field_ui, style.login.input ]}
                    validator = { async (it) => {
                        if (!email_regex.test(it)) {
                            return [ false, `${it} isn't valid` ]
                        }

                        if ( !this.login && await this.client.email_exists(it) ) {
                            return [ false, `${it} is occupied` ]
                        }

                        return [ true, null ]
                    } }/>
                <ValidInput
                    ref = { (ref) => { this.input_password = ref } }
                    name = { "password" }
                    key = { "password" }
                    secureTextEntry = { true }
                    autoCompleteType = { "password" }
                    returnKeyType = { "done" }
                    onSubmitEditing = { () => this.input_password.blur() }
                    style = {[  style.generic.text_field_ui, style.login.input ]}
                    validator = { async (it) => {
                        if (it.length < 8) {
                            return [ false, `password too short ${it.length} < 8` ]
                        }

                        return [ true, null ]
                    } }/>
            </View>
        )
    }

    get submit_button() {
        return (
            <TalkingButton
                ref = { ref => this.submit_button_ref = ref }
                disabled = { this.submit_disabled }
                onPress = { () => { this.submit() } }
                style = {[ style.generic.button_ui, { opacity: this.submit_disabled ? .2 : 1 }]}
                textStyle = {[ style.login.button_text, style.generic.text_ui]}>
                { "submit" }
            </TalkingButton>
        )
    }

    get buttons() {
        return (
            <View style = { style.login.button_contain }>
                { this.submit_button }
            </View>
        )
    }

    get content() {
        return (
            <View style = {[ style.generic.view ]}>
                { this.top }
                { this.inputs }
                { this.buttons }
            </View>
        )
    }
}

export default LoginView
