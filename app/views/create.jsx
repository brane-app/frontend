import React from "react"
import {
    TouchableOpacity,
    Text,
    TextInput,
    View,
} from "react-native"
import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from "expo-file-system"
import HeadedView from "../components/headed_view"
import state from "../state"
import colors from "../values/colors"

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
             submitting: false,
             submit_button_text: "submit",
             submit_button_color: colors.blue,
         }
    }

    get select_result() {
        return this.state.select_result
    }

    get submitting() {
        return this.state.submitting
    }

    get submit_button_text() {
        return this.state.submit_button_text
    }

    get submit_button_color() {
        return this.state.submit_button_color
    }

    get submittable() {
        return [
            this.select_result.uri,
            this.select_result.size,
            this.select_result.type === "success",
            !this.submitting
        ].every(it => it)
    }

    get header() {
        return null
    }

    async submit_selected() {
        const result = this.select_result
        const file_base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 })
        try {
            await state.client.upload_content_base64([], false, false, file_base64)
            return true
        } catch (err) {
            return false
        }
    }

    async submit_selected_wrap() {
        this.setState(
            { submitting: true, submit_button_text: "submitting" },
            async () => {
                this.draw_upload_result(await this.submit_selected())
                this.setState({ submitting: false })
            }
        )

    }

    async draw_upload_result(ok) {
        this.setState(
            {
                submit_button_text: ok ? "submitted" : "failed",
                submit_button_color: ok ? colors.green : colors.red,
            }, () => {
                setTimeout( () => { this.props.navigation.replace("feed_all") }, 3000 )
            }
        )
    }

    async get_document() {
        DocumentPicker.getDocumentAsync().then(it => this.setState({ select_result: it }))
    }

    get file_select_button() {
        return (
            <TouchableOpacity
                disabled = { this.submitting }
                onPress = { () => this.get_document() }
                style = { style.ui.rounded_pressable }>
                <Text style = { style.ui.text_light }>
                    { "browse" }
                </Text>
            </TouchableOpacity>
        )
    }

    get file_select_info_text() {
        if (this.select_result.type !== "success") {
            return "nothing selected"
        }

        return this.select_result.name
    }

    get file_select() {
        return (
            <View>
                { this.file_select_button }
            </View>
        )
    }

    get submit_button() {
        return (
            <TouchableOpacity
                disabled = { !this.submittable }
                onPress = { () => this.submit_selected_wrap() }
                style = {[
                    style.ui.rounded_pressable,
                    { opacity: this.submittable ? 1 : 0.7 },
                    { backgroundColor: this.submit_button_color }
                ]}>
                <Text style = { style.ui.text_light }>
                    { this.submit_button_text }
                </Text>
            </TouchableOpacity>
        )
    }

    get meta_fields() {
        return (
            <View>
                <Text
                    style = { { ...style.ui.text_light, ...style.ui.text_small } }>
                    { this.file_select_info_text }
                </Text>
            </View>
        )
    }

    get tags() {
        return <TextInput
                    multiline = { true }
                    style = { style.create.tags_text_input }/>
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
