import React from "react"
import {
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native"

import imonke from "imonke"

import style_generic from "../style/generic"
import style_login from "../style/views/login"
import global_state from "../state"

const style = {
    generic: style_generic,
    login: style_login,
}

class ValidInput {
    constructor (opts) {
        this._value = ""

        this.title = opts.title || ""
        this.validator = opts.validator || (_ => true)
    }

    get value () {
        return this._value
    }

    get valid () {
        return this.validator(this.value)
    }

    get widget() {
        return (
            <TextInput
                style = {[style.login.input, style.generic.text_field_ui]}
                onChangeText = {it => this._value = it}
                key = {this.title}/>
        )
    }
}

class ValidPassword extends ValidInput {
    get widget() {
        return (
            <TextInput
                style = {[style.login.input, style.generic.text_field_ui]}
                onChangeText = {it => this._value = it}
                secureTextEntry = {true}
                key = {this.title}/>
        )
    }
}

class LoginView extends React.Component {
    constructor (opts) {
        super(opts)
        this.state = {login: true}

        this.login_inputs = new Map([
            ["email", new ValidInput({title: "email"})],
            ["password", new ValidPassword({title: "password"})],
        ])

        this.register_inputs = new Map([
            ["nick", new ValidInput({title: "nick"})],
            ["email", new ValidInput({title: "email"})],
            ["password", new ValidPassword({title: "password"})],
        ])
    }

    async submit_register() {
        ToastAndroid.show("Not implemented", ToastAndroid.SHORT)
    }

    async submit_login() {
        for (let it of this.login_inputs.entries()) {
            if (!it[1].valid) {
                ToastAndroid.show(`Invalid ${it[0]}`, ToastAndroid.SHORT)
                return
            }
        }

        let values = Object.fromEntries(
            Array.from(this.login_inputs.entries(), it => [it[0], it[1].value])
        )

        let ok = false
        let client = new imonke.Client({
            email: values.email,
        })

        try {
            ok = await client.login({
                password: values.password,
            })
        } catch (err) {
            // user facing errors because I DON'T CARE
            // IF YOU HAVE A BUG JUST FIX IT YOURSELF IT'S OPEN SOURCE
            // I am not a frontend developer
            ToastAndroid.show(err, ToastAndroid.SHORT)
            return
        }

        if (!ok) {
            ToastAndroid.show("Bad credentials", ToastAndroid.SHORT)
            return
        }

        global_state.client = client
        this.props.navigation.replace("profile")
    }

    async submit() {
        this.state.login ? await this.submit_login() : await this.submit_register()
    }

    button_text(value) {
        return (
            <Text
            style = {[style.login.button_text, style.generic.text_ui]}>
                {value}
            </Text>
        )
    }

    get login () {
        return this.state.login
    }

    set login(value) {
        this.setState({login: value})
    }

    get inputs() {
        let fields = this.login ? this.login_inputs : this.register_inputs

        return (
            <View
            style = {style.login.input_contain}>
                {Array.from(fields.values(), (value) => value.widget)}
            </View>
        )
    }

    get top() {
        return (
            <View
            style = {style.login.top_contain}>
                <TouchableOpacity
                    onPress = {() => this.login = false}
                    style = {[style.login.top_switcher, this.login ? {} : style.login.top_switcher_underline]}>
                    {this.button_text("register")}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {() => this.login = true}
                    style = {[style.login.top_switcher, this.login ? style.login.top_switcher_underline : {}]}>
                    {this.button_text("login")}
                </TouchableOpacity>
            </View>
        )
    }

    get submit_button () {
        return (
            <TouchableOpacity
            onPress = {() => {this.submit()}}
            style = {style.generic.button_ui}>
                {this.button_text("submit")}
            </TouchableOpacity>
        )
    }

    get buttons() {
        return (
            <View style = {style.login.button_contain}>
                {this.submit_button}
            </View>
        )
    }

    render () {
        return (
            <View style = {style.generic.view}>
                {this.top}
                {this.inputs}
                {this.buttons}
            </View>
        )
    }
}

export default LoginView
