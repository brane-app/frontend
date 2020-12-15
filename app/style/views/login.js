import Constants from "expo-constants"
import { StyleSheet } from "react-native"

import colors from "../../values/colors"

const view = {
    marginTop: Constants.statusBarHeight,
}

const top_contain = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",

    height: "20%",
    maxHeight: 58,

    ...container,
}

const top_switcher = {
    display: "flex",

    height: "100%",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,

    marginRight: "auto",
    marginLeft: "auto",

    justifyContent: "center",
}

const top_switcher_underline = {
    marginBottom: -2,

    borderBottomColor: colors.blue,
    borderBottomWidth: 2,
}

const container = {
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
}

const input_contain = {
    display: "flex",
    justifyContent: "center",

    height: "70%",
    ...container,
}

const continue_contain = {
    ...input_contain,
}

const input = {
    flexGrow: 0,

    marginTop: 12,
    marginBottom: 12,

    width: "100%",
    height: 48,
}

const button_text = {
        textAlign: "center",

        width: "100%",

        color: "white",
    }

const button_gap = {
        flexGrow: 1,
    }

export default StyleSheet.create({
    button_gap,
    button_text,
    continue_contain,
    input_contain,
    input,
    top_contain,
    top_switcher_underline,
    top_switcher,
    view,
})
