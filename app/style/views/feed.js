import Native from "react-native"

const feed_styles = {
    contain_image: {
        display: "flex",

        width: "100%",
        height: "100%",
    },

    contain_image_container: {
        justifyContent: "center",
        flexGrow: 1,
    },

    image: {
        marginTop: "auto",
        marginBottom: "auto",

        resizeMode: "contain",
    },

    image_scroller: { },
}

const feed = Native.StyleSheet.create({
    ...feed_styles,
})

export default feed
