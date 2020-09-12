import Native from "react-native"

import colors from "../../values/colors"

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
    },

    header: {
        position: "absolute",

        width: "100%",
        height: 32,
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

const headed_view = Native.StyleSheet.create({
    ...headed_view_things,
})

export default headed_view
