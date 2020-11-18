import { StyleSheet } from "react-native";

import colors from "../values/colors"

const things_iu = {
    text_ui: {
        fontSize: 19,

        color: colors.light,
    },

    button_ui: {
        backgroundColor: colors.blue,
        alignItems: "center",

        minWidth: "30%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: 10,

        borderRadius:  1000,
    },

    text_field_ui: {
        borderColor: colors.blue,
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 8,

        color: colors.light,
        backgroundColor: colors.dark,
    },
}

const misc = {
    view: {
        backgroundColor: colors.background,

        height: "100%",
        width: "100%",
    },
}

const generic = StyleSheet.create({
    ...things_iu,
    ...misc,
})

export default generic
