import React from "react"
import {
    Text,
    TouchableOpacity,
} from "react-native"

class TalkingButton extends React.Component {
    constructor(opts = {}) {
        super(opts)
        this.state = {
            text: null,
            color: null,
        }
    }

    async clear(callback) {
        this.setState({ text: null, color: null }, callback)
    }

    async clear_color(callback) {
        this.setState({ color: null }, callback)
    }

    async clear_text(callback) {
        this.setState({ text: null }, callback)
    }

    async set_say(text, opts = {}) {
        if (opts.time) {
            this.setState(
                { text },
                () => setTimeout( () => this.clear_text(opts.callback), opts.time)
            )

            return
        }

        this.setState({ text }, opts.callback)
    }

    async set_color(color, opts = {}) {
        if (opts.time) {
            this.setState(
                { color },
                () => setTimeout( () => this.clear_color(opts.callback), opts.time)
            )

            return
        }

        this.setState({ color }, opts.callback)
    }

    async set_say_color(text, color, opts = {}) {
        if (opts.time) {
            this.setState(
                { text, color },
                () => setTimeout( () => this.clear(opts.callback), opts.time)
            )

            return
        }

        this.setState({ text, color }, opts.callback)
    }

    get text() {
        return this.state.text
    }

    get color() {
        return this.state.color
    }

    get style() {
        return [
            this.props.style,
            (this.color ? { backgroundColor: this.color } : {})
        ]
    }

    get text_wrapped() {
        return (
            <Text style = { this.props.textStyle }>
                { this.text || this.props.children }
            </Text>
        )
    }

    render() {
        return (
            <TouchableOpacity { ...this.props } style = { this.style }>
                { this.text_wrapped }
            </TouchableOpacity>
        )
    }
}

export default TalkingButton
