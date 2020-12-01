import { StyleSheet } from "react-native"

import colors from "../../values/colors"

const contain = {
    display: "flex",
    justifyContent: "space-evenly",

    height: "100%",
}

const tags_text_input = {
    width: "70%",
    borderColor: colors.blue,
}

export default StyleSheet.create({
    contain,
    tags_text_input,
})
