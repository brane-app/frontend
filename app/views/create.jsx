import React from "react"
import {
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native"
import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from "expo-file-system"
import HeadedView from "../components/headed_view"
import state from "../state"

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
             select_result: {},
             draw_select_result: false,
             submitting: true,
         }
    }

    get select_result() {
        return this.state.select_result
    }

    get draw_select_result() {
        return this.state.draw_select_result
    }

    get file_select_stream() {

    }

    get submittable() {
        return [
            this.select_result.uri,
            this.select_result.size,
            this.select_result.type === "success",
        ].every(it => it)
    }

    get header() {
        return null
    }

    async submit_selected() {
        console.log(new Blob([1]) == null);
        if (!this.submittable) {
            return
        }

        const result = this.select_result
        const file_base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 })
        let uploaded = await state.client.upload_content_base64([], false, false, file_base64)
    }

    get file_select_button() {
        return (
            <Pressable
                onPress = { () => DocumentPicker.getDocumentAsync().then(it => this.setState({ select_result: it })) }
                onLongPress = { () => this.setState({ draw_select_result: !this.draw_select_result }) }
                style = { style.ui.rounded_pressable }>
                <Text style = { style.ui.text_light }>
                    { "browse" }
                </Text>
            </Pressable>
        )
    }

    get file_select_info_text() {
        if (!this.select_result.type === "success") {
            return "nothing selected"
        }

        return "something"
    }

    get file_select_info() {
        return (
            <Text>
                { this.draw_select_result ? this.file_select_info_text : null }
            </Text>
        )
    }

    get file_select() {
        return (
            <View>
                { this.file_select_button }
                { this.file_select_info }
            </View>
        )
    }

    get submit_button() {
        return (
            <Pressable
                onPress = { () => this.submit_selected() }
                style = {
                    this.submittable ?
                    style.ui.rounded_pressable :
                    style.ui.rounded_pressable_disabled
                }>
                <Text style = { style.ui.text_light }>
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
        return null
    }

    get content() {
        return (
            <View style = { style.create.contain }>
                { this.file_select }
                { this.meta_fields }
                { this.submit_button }
            </View>
        )
    }
}

export default CreateView
