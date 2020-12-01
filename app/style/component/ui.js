import { StyleSheet } from "react-native"

import colors from "../../values/colors"

function rounded_pressable(event) {
    return {
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

        opacity: event.pressed ? 0.3 : 1,
    }
}

function rounded_pressable_disabled(event) {
    return { ...rounded_pressable(event), opacity: 0.7 }
}

const light_text = {
    color: colors.light,
    textAlign: "center",

    fontSize: 19,
}

export default StyleSheet.create({
    rounded_pressable,
    rounded_pressable_disabled,
    light_text,
})
