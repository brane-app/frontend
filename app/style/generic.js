import { StyleSheet } from "react-native";

import colors from "../values/colors"

const text_field_ui = {
    borderColor: colors.blue,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 8,

    color: colors.light,
    backgroundColor: colors.dark,
}

const text_light_ui = {
    fontSize: 13,
    color: colors.gray_text_dark,
}

const text_ui = {
    fontSize: 19,

    color: colors.light,
}

const button_ui = {
    backgroundColor: colors.blue,
    alignItems: "center",

    minWidth: "30%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,

    borderRadius:  1000,
}

const view = {
    backgroundColor: colors.background,

    height: "100%",
    width: "100%",
}

function center_padded(padding) {
    return {
        padding: padding,

        alignItems: "center",
    }
}

const generic = StyleSheet.create({
    button_ui,
    text_field_ui,
    text_light_ui,
    text_ui,
    view,
    center_padded,
})

export default generic
