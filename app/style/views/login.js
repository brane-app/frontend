import Constants from "expo-constants"
import { StyleSheet } from "react-native"

import colors from "../../values/colors"

const container = {
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
}

const view_styles = {
    view: {
        marginTop: Constants.statusBarHeight,
    }
}

const top_styles = {
    top_contain: {
        display: "flex",
        flexDirection: "row",

        height: "20%",
        maxHeight: 58,

        ...container,
    },

    top_switcher: {
        display: "flex",

        height: "100%",
        width: "40%",

        marginRight: "auto",
        marginLeft: "auto",

        justifyContent: "center",
    },

    top_switcher_underline: {
        marginBottom: -2,

        borderBottomColor: colors.blue,
        borderBottomWidth: 2,
    },
}

const input_styles = {
    input_contain: {
        display: "flex",
        justifyContent: "center",

        height: "70%",
        ...container,
    },

    input: {
        flexGrow: 0,

        marginTop: 12,
        marginBottom: 12,

        width: "100%",
        height: 48,
    }
}

const button_styles = {
    button_text: {
        textAlign: "center",

        width: "100%",

        color: "white",
    },

    button_gap: {
        flexGrow: 1,
    },
}

const style = StyleSheet.create({
    ...view_styles,
    ...top_styles,
    ...input_styles,
    ...button_styles,
})

export default style
