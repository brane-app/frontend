import Native from "react-native"

const feed_styles = {
    contain: {
        display: "flex",
        backgroundColor: "white",

        width: "100%",
        height: "100%",
    },

    image: {
        marginTop: "auto",
        marginBottom: "auto",

        resizeMode: "contain",
    },
}

const feed = Native.StyleSheet.create({
    ...feed_styles,
})

export default feed
