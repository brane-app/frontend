import { StyleSheet } from "react-native"

import colors from "../../values/colors"
import sizes from "../../values/sizes"

const headed_view_things = {
    contain: {
        height: "100%",
        backgroundColor: colors.dark,
    },

    content_contain: {
        position: "absolute",

        height: "100%",
        width: "100%",
        zIndex: 0,

        paddingTop: sizes.navbar,
    },

    header: {
        position: "absolute",

        width: "100%",
        height: sizes.navbar,
        zIndex: 1,
    },

    header_contain: {
        display: "flex",
        flexDirection: "row",

        width: "95%",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
    },

    text: {
        flexGrow: 1,
        fontSize: 16,
        paddingLeft: 4,
    },
}

const headed_view = StyleSheet.create({
    ...headed_view_things,
})

export default headed_view
