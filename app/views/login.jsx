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
        this.state = { value: "", valid: true, message: null }
        this.validator = this.props.validator || (() => true)
        this.input_ref = null
    }

    get value() {
        return this.state.value
    }

    get valid() {
        return this.state.valid || this.value == ""
    }

    get message() {
        return this.state.message
    }

    get style() {
        return { borderColor: this.valid ? colors.blue : colors.red }
    }

    async blur() {
        this.input_ref.blur()
    }

    async focus() {
        this.input_ref.focus()
    }

    async on_change(value) {
        let valid, message
        [ valid, message ] = await this.validator(value)
        this.setState({ value, valid, message })
    }

    get input() {
        return (
            <TextInput
            ref = { (ref) => { this.input_ref = ref } }
            onChangeText = { (it) => { this.on_change(it) } }
            style = {[ style.generic.text_field_ui, style.login.input, this.props.style, this.style ]}
            autoCompleteType = { this.props.autoCompleteType }
            onSubmitEditing = { this.props.onSubmitEditing }
            placeholder = { this.props.name }
            returnKeyType = { this.props.returnKeyType }
            secureTextEntry = { this.props.secureTextEntry }
            placeholderTextColor = { colors.gray_text_dark }
            autoCapitalize = { "none" }
            autoCorrect = { false }
            blurOnSubmit = { false }
            clearButtonMode = { "while-editing" }
            textAlign = { "center" }/>
        )
    }

    get message_display() {
        if (!this.message || this.value == "") {
            return null
        }

        return (
            <Text style = {[ style.login.message ]}>
                { this.message }
            </Text>
        )
    }

    render() {
        return (
            <View>
                { this.input }
                { this.message_display }
            </View>
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
                        name = { "nick" }
                        key = { "nick" }
                        autoCompleteType = { "off" }
                        returnKeyType = { "next" }
                        onSubmitEditing = { () => this.input_email.focus() }
                        ref = { (ref) => { this.input_nick = ref } }
                        validator = { async (it) => {
                            if (64 < it.length) {
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
                    name = { "email" }
                    key = { "email" }
                    autoCompleteType = { "email" }
                    returnKeyType = { "next" }
                    onSubmitEditing = { () => this.input_password.focus() }
                    ref = { (ref) => { this.input_email = ref } }
                    validator = { async (it) => {
                        if (email_regex.test(it)) {
                            return [ true, null ]
                        }

                        if ( !this.login && await this.client.email_exists(it) ) {
                            return [ false, `${it} is occupied` ]
                        }

                        return [ false, `${it} isn't valid` ]
                    } }/>
                <ValidInput
                    name = { "password" }
                    key = { "password" }
                    secureTextEntry = { true }
                    autoCompleteType = { "password" }
                    returnKeyType = { "done" }
                    onSubmitEditing = { () => this.input_password.blur() }
                    ref = { (ref) => { this.input_password = ref } }
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
