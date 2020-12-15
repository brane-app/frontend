import { Client } from "imonke"
import React from "react"
import {
    AsyncStorage,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    View,
} from "react-native"

import HeadedView from "../components/headed_view"
import TalkingButton from "../components/talking_button"
import ValidInput from "../components/valid_input"
import global_state from "../state"
import colors from "../values/colors"

const style = {
    continue: require("../style/component/continue_card").default,
    generic: require("../style/generic").default,
    login: require("../style/views/login").default,
    ui: require("../style/component/ui").default,
}

const nick_regex = /^[A-Za-z0-9.\-_]+$/
const email_regex = /^[^@]+@[^@]+$/

class ContinueCard extends React.Component {
    constructor(opts = {}) {
        super()
        let data = opts.data || {}
        if (!data.email && !data.nick) {
            throw "Not enough data to lookup a profile"
        }

        this.state = { profile_data: opts.data }
        this.input_ref = null
    }

    get profile_data() {
        return this.state.profile_data
    }

    get email() {
        return this.profile_data.email
    }

    get secret() {
        return this.profile_data.secret
    }

    async recieve_ref(ref) {
        this.input_ref = ref
        if (ref) {
            ref.focus()
        }
    }

    async on_press_data(event) {
        this.props.onPress(event, this.profile_data)
    }

    get image() {
        return <Image style = {[ style.continue.image ]}/>
    }

    get text() {
        return (
            <Text style = {[ style.continue.text ]}>
                { this.email }
            </Text>
        )
    }

    render() {
        return (
            <Pressable
                { ...this.props }
                style = {[ this.props.style, style.continue.card ]}
                onPress = { event => this.on_press_data(event) }>
                { this.image }
                { this.text }
            </Pressable>
        )
    }
}

class LoginView extends HeadedView {
    constructor(opts = {}) {
        super(opts)
        this.state = {
            ...this.state,
            submit_type: "register",
            submit_disabled: false,
            selected_profile: null,
            stored_profiles: {},
        }
        this.client = new Client()
        this.input_nick = null
        this.input_email = null
        this.input_password = null
        this.submit_button_ref = null
        this.selected_profile_ref = null

        AsyncStorage.getItem("stored_profiles").then(
            it => {
                const data = JSON.parse(it) || {}
                this.setState({
                    stored_profiles: data,
                    submit_type: Object.values(data).length == 0 ? "register": "continue",
                })
            }
        )
    }

    get submit_type() {
        return this.state.submit_type
    }

    get submit_disabled() {
        return this.state.submit_disabled
    }

    get selected_profile() {
        return this.state.selected_profile
    }

    get stored_profiles() {
        return this.state.stored_profiles
    }

    async valid(fields) {
        return fields
            .map(it => this[`input_${it}`])
            .every(it => it != null && it.valid && it.value.length != 0)
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

    async entries(fields) {
        return Object.fromEntries(
            fields.map(it => [ it, this[`input_${it}`].value ])
        )
    }

    // continuing stuff

    async set_continue_profile(data) {
        if (data.email && data.secret && await this.client.login(data)) {
            this.navigate_after_auth()
            return
        }

        this.setState({ selected_profile: data })
    }

    async wipe_continue_profile(data) {
        this.setState({ selected_profile: null })
    }

    // submitting stuff

    async submit_login() {
        const fields = [ "email", "password" ]
        if (!await this.valid(fields)) {
            return false
        }

        if (await this.client.login(await this.entries(fields))) {
            return true
        } else {
            this.display("bad credentials")
        }

        return false
    }

    async submit_register() {
        const fields = [ "nick", "email", "password" ]
        if (!await this.valid(fields)) {
            return false
        }

        return await this.client.create(await this.entries(fields))
    }

    async submit_continue() {
        const fields = [ "password" ]
        if (!await this.valid(fields)) {
            return false
        }

        const data = {
            ...(await this.entries(fields)),
            email: this.selected_profile.email,
        }

        if (await this.client.login(data)) {
            return true
        } else {
            this.display("bad credentials")
        }

        return false
    }

    async submit() {
        let result
        switch (this.submit_type) {
            case "login":
                result = await this.submit_login()
                break
            case "register":
                result = await this.submit_register()
                break
            case "continue":
                result = await this.submit_continue()
                break
        }

        if (result) {
            this.navigate_after_auth()
        }
    }

    async navigate_after_auth() {
        const writable = {
            ...this.stored_profiles,
            [ this.client._email ]: {
                email: this.client._email,
                secret: this.client._secret,
                time: Date.now(),
            }
        }

        AsyncStorage.setItem("stored_profiles", JSON.stringify(writable))
        global_state.client = this.client
        this.props.navigation.replace("profile")
    }

    async submit_wrapped() {
        this.setState(
            { submit_disabled: true },
            async () => {
                try {
                    if (!await this.submit()) {
                        this.display(`failed to ${this.submit_type}`)
                    }
                } catch (err) {
                    console.log(err);
                    this.display(`error trying to ${this.submit_type}`)
                } finally {
                    this.setState({ submit_disabled: false })
                }
            }
        )
    }

    top_underline_if(submit_type) {
        return submit_type == this.submit_type
            ? style.login.top_switcher_underline
            : {}
    }

    top_switch(target) {
        return (
            <TouchableOpacity
                onPress = { () => this.setState({ submit_type: target, selected_profile: null }) }
                style = {[ style.login.top_switcher, this.top_underline_if(target) ]}>
                <Text style = {[ style.generic.text_ui, style.login.button_text ]}>
                    { target }
                </Text>
            </TouchableOpacity>
        )
    }

    get header() {
        return null
    }

    get top() {
        return (
            <View style = { style.login.top_contain }>
                { this.top_switch("register") }
                { this.top_switch("login") }
                { Object.keys(this.stored_profiles).length == 0 ? null : this.top_switch("continue") }
            </View>
        )
    }

    get field_nick() {
        return (
            <ValidInput
                ref = { (ref) => { this.input_nick = ref } }
                name = { "nick" }
                key = { "nick" }
                autoCompleteType = { "off" }
                returnKeyType = { "next" }
                onSubmitEditing = { () => this.input_email.focus() }
                style = {[  style.generic.text_field_ui, style.login.input ]}
                validator = {
                    async (it) => {
                        if (!nick_regex.test(it)) {
                            return [ false, `${it} is invalid` ]
                        }

                        if (16 < it.length) {
                            return [ false, `${it} is too long (${it.length} > 64)` ]
                        }

                        if (it.length < 4) {
                            return [ false, `${it} is too short (${it.length} < 4)` ]
                        }

                        if ( this.submit_type == "register" && await this.client.nick_exists(it) ) {
                            return [ false, `${it} is occupied` ]
                        }

                        return [ true, null ]
                    }
                }/>
        )
    }

    get field_email() {
        return (
            <ValidInput
                ref = { (ref) => { this.input_email = ref } }
                name = { "email" }
                key = { "email" }
                autoCompleteType = { "email" }
                returnKeyType = { "next" }
                onSubmitEditing = { () => this.input_password.focus() }
                style = {[  style.generic.text_field_ui, style.login.input ]}
                validator = {
                    async (it) => {
                        if (!email_regex.test(it)) {
                            return [ false, `${it} isn't valid` ]
                        }

                        if ( this.submit_type == "register" && await this.client.email_exists(it) ) {
                            return [ false, `${it} is occupied` ]
                        }

                        return [ true, null ]
                    }
                }/>
        )
    }

    get field_password() {
        return (
            <ValidInput
                ref = { (ref) => { this.input_password = ref } }
                name = { "password" }
                key = { "password" }
                secureTextEntry = { true }
                autoCompleteType = { "password" }
                returnKeyType = { "done" }
                onSubmitEditing = { () => this.input_password.blur() }
                style = {[  style.generic.text_field_ui, style.login.input ]}
                validator = {
                    async (it) => {
                        if (it.length < 8) {
                            return [ false, `password too short ${it.length} < 8` ]
                        }

                        return [ true, null ]
                    }
                }/>
        )
    }

    get fields() {
        return [
            this.submit_type == "register" ? this.field_nick : null,
            this.field_email,
            this.field_password,
        ]

    }

    get profiles() {
        return Object
            .values(this.stored_profiles)
            .sort((it, next) => { return it.time < next.time })
            .map( it => (
                    <ContinueCard
                        data = { it }
                        key = { it.email }
                        onPress = { (_, data) => this.set_continue_profile(data) }
                        style = {[ style.generic.text_field_ui, style.login.input ]}/>
                ) )
    }

    get selected_profile_card() {
        return (
            <>
                <ContinueCard
                    ref = { ref => this.selected_profile_ref = ref }
                    data = { this.selected_profile }
                    key = { this.selected_profile.email }
                    onPress = { _ => this.wipe_continue_profile() }
                    style = {[ style.generic.text_field_ui, style.login.input ]}/>
                { this.field_password }
            </>
        )
    }

    get continue() {
        return this.selected_profile ? this.selected_profile_card : this.profiles
    }

    get submit_button() {
        if (this.submit_type == "continue" && !this.selected_profile) {
            return null
        }

        return (
            <TalkingButton
                ref = { ref => this.submit_button_ref = ref }
                disabled = { this.submit_disabled }
                onPress = { () => { this.submit_wrapped() } }
                style = {[ style.generic.button_ui, { opacity: this.submit_disabled ? .2 : 1 } ]}
                textStyle = {[ style.login.button_text, style.generic.text_ui ]}>
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
                <View style = { style.login.input_contain }>
                    { this.submit_type == "continue" ? this.continue : this.fields }
                </View>
                { this.buttons }
            </View>
        )
    }
}

export default LoginView
