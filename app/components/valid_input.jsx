import React from "react"
import {
    Text,
    TextInput,
    View,
} from "react-native"

import colors from "../values/colors"

const style = {
    ui: require("../style/component/ui").default,
}


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
        return [
            this.props.style,
            { borderColor: this.valid ? colors.blue : colors.red },
        ]
    }

    async blur() {
        this.input_ref.blur()
    }

    async focus() {
        this.input_ref.focus()
    }

    async on_change(value) {
        const [ valid, message ] = await this.validator(value)
        this.setState({ value, valid, message })
    }

    get static_props() {
        return {
            ...this.props,
            placeholderTextColor: colors.gray_text_dark,
            placeholder: this.props.name,
            autoCapitalize: "none",
            clearButtonMode: "while-editing",
            autoCorrect: false,
            blurOnSubmit: false,
            textAlign: "center",
        }
    }

    get input() {
        return (
            <TextInput
                { ...this.static_props }
                ref = { (ref) => { this.input_ref = ref } }
                onChangeText = { (it) => { this.on_change(it) } }
                style = { this.style } />
        )
    }

    get message_display() {
        if (!this.message || this.value == "") {
            return null
        }

        return (
            <Text style = {[ style.ui.text_validator_message ]}>
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

export default ValidInput
