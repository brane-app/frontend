import { StyleSheet } from "react-native"

import colors from "../../values/colors"

const rounded_pressable = {
    backgroundColor: colors.blue,
    alignItems: "center",

    width: "70%",

    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,

    borderRadius: 1000,
}

const rounded_pressable_disabled = {
    ...rounded_pressable,
    opacity: 0.7
}

const text_light = {
    color: colors.light,
    textAlign: "center",

    fontSize: 19,
}

const text_small = {
    fontSize: 10,
}

const text_code_block = {
    color: colors.text_code_block,
    backgroundColor: colors.background_code_block,

    ...text_small,
}

export default StyleSheet.create({
    rounded_pressable,
    rounded_pressable_disabled,
    text_light,
    text_small,
    text_code_block,
})
