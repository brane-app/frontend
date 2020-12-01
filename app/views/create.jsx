import React from "react"
import {
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native"
import HeadedView from "../components/headed_view"

const style = {
    ui: require("../style/component/ui").default,
    create: require("../style/views/create").default,
}

class CreateView extends HeadedView {
    constructor(opts = {}) {
        super(opts)
         this.state = {
             ...this.state,
             nsfw: false,
             featurable: true,
             browse_pressed: true,
             submit_pressed: true,
         }
    }

    get browse_pressed() {
        return this.state.browse_pressed
    }

    get submit_pressed() {
        return this.state.submit_pressed
    }

    get header() {
        return null
    }

    get browse_button() {
        return (
            <Pressable style = { style.ui.rounded_pressable }>
                <Text style = { style.ui.light_text }>
                    { "browse" }
                </Text>
            </Pressable>
        )
    }

    get submit_button() {
        return (
            <Pressable style = { style.ui.rounded_pressable }>
                <Text style = { style.ui.light_text }>
                    { "upload" }
                </Text>
            </Pressable>
        )
    }

    get tags() {
        return <TextInput
                    multiline = { true }
                    style = { style.create.tags_text_input }/>
    }

    get meta_fields() {
        return (
            <>
                { this.tags }
            </>
        )
    }

    get content() {
        return (
            <View style = { style.create.contain }>
                { this.browse_button }
                { this.meta_fields }
                { this.submit_button }
            </View>
        )
    }
}

export default CreateView
