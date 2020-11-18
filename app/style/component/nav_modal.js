import { StyleSheet } from "react-native"

import colors from "../../values/colors"

const modal_things = {
    dim: {
        backgroundColor: "#00000050",

        width: "100%",
        height: "100%",
    },

    contain: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: colors.dark,

        width: "95%",

        marginLeft: "auto",
        marginRight: "auto",

        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,

        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },

    button: {
        paddingTop: 4,
        paddingBottom: 4,
    },

    text: {
        fontSize: 16,
    },

    close: {
        width: 18,
        height: 18,

        marginTop: 16,
        marginLeft: -8,
    },
}

const nav_modal = StyleSheet.create({
    ...modal_things,
})

export default nav_modal
