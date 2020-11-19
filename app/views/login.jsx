import { Client } from "imonke"
import React from "react"
import {
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native"

import HeadedView from "../components/headed_view"
import global_state from "../state"
import colors from "../values/colors"

const style = {
    generic: require("../style/generic").default,
    login: require("../style/views/login").default
}

const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class ValidInput extends React.Component {
    constructor(opts) {
        super(opts)
        this.state = { value: "", valid: true }
        this.validator = this.props.validator || (() => true)
        this.input = null
    }

    get value() {
        return this.state.value
    }

    get valid() {
        return this.state.valid
    }

    async on_change(value) {
        this.setState({ value, valid: this.validator(value) })

    }

    render() {
        return (
            <TextInput
                placeholder = { this.props.name }
                placeholderTextColor = { colors.gray_text_dark }
                ref = { (ref) => { this.input = ref } }
                style = {[ style.generic.text_field_ui, style.login.input, this.props.style ]}
                onChangeText = { (it) => { this.on_change(it) } }
                secureTextEntry = { this.props.secureTextEntry }
                autoCompleteType = { this.props.autoCompleteType }
                clearButtonMode = { "while-editing" }
                textAlign = { "center" }
                autoCapitalize = { "none" }/>
        )
    }
}

class LoginView extends HeadedView {
    constructor(opts = {}) {
        super(opts)
        this.state = { ...this.state, login: false, submit_disabled: false }

        this.client = new Client()
        this.input_nick = null
        this.input_email = null
        this.input_password = null
    }

    async display(message) {
        // TODO: make iOS compatible
        ToastAndroid.show(message, ToastAndroid.SHORT)
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

        try {
            if ( await this.client.login(await this.entries(fields)) ) {
                return true
            } else {
                this.display("bad credentials")
            }
        } catch(err) {
            this.display(err)
        }

        return false
    }

    async submit_register() {
        const fields = [ "nick", "email", "password" ]
        if (!await this.valid(fields)) {
            return
        }

        try {
            if( await this.client.create(await this.entries(fields)) ) {
                return true
            } else {
                this.display("failed")
            }
        } catch(err) {
            this.display(err)
        }
    }

    async submit() {
        this.setState(
            { submit_disabled: true },
            async () => {
                if (this.state.login ? await this.submit_login() : await this.submit_register()) {
                    global_state.client = this.client
                    this.props.navigation.replace("profile")
                }

                this.setState({ submit_disabled: false })
            }
        )
    }

    get name() {
        return "login"
    }

    get login() {
        return this.state.login
    }

    get submit_disabled() {
        return this.state.submit_disabled
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
                        name = { "nick" }
                        key = { "nick" }
                        autoCompleteType = { "username" }
                        ref = { (ref) => { this.input_nick = ref } }
                        validator = { it => 64 >= it.length && it.length >= 4 }/>
                }
                <ValidInput
                    name = { "email" }
                    key = { "email" }
                    autoCompleteType = { "email" }
                    ref = { (ref) => { this.input_email = ref } }
                    validator = { it => email_regex.test(it) }/>
                <ValidInput
                    name = { "password" }
                    key = { "password" }
                    secureTextEntry = { true }
                    autoCompleteType = { "password" }
                    ref = { (ref) => { this.input_password = ref } }
                    validator = { it => it.length >= 8 }/>
            </View>
        )
    }

    get submit_button() {
        return (
            <TouchableOpacity
                disabled = { this.submit_disabled }
                onPress = { () => { this.submit() } }
                style = {[ style.generic.button_ui, { opacity: this.submit_disabled ? .2 : 1 }]}>
                <Text style = {[ style.login.button_text, style.generic.text_ui ]}>
                    { "submit" }
                </Text>
            </TouchableOpacity>
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
