import Constants from "expo-constants"
import { StyleSheet } from "react-native"

import colors from "../../values/colors"
import sizes from "../../values/sizes"

const contain = {
    display: "flex",

    height: "100%",

    backgroundColor: colors.dark,
}

const status_bar_blank = {
    flexGrow: 0,

    height: Constants.statusBarHeight,
    width: "100%",

    backgroundColor: "#00000000",
}

const header = {
    flexGrow: 0,

    height: sizes.navbar,
    width: "100%",
}

const content_contain = {
    flexGrow: 1,

    width: "100%",
    height: 0,
}

export default StyleSheet.create({
    contain,
    header,
    status_bar_blank,
    content_contain,
})
