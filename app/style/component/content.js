import Native from "react-native"

const content_styles = {
    image: {
        marginTop: "auto",
        marginBottom: "auto",

        resizeMode: "contain",
    },
    
    contain_image: {
        display: "flex",

        width: "100%",
        height: "100%",
    },

    contain_image_container: {
        justifyContent: "center",
        flexGrow: 1,
    },
}

const style = Native.StyleSheet.create({
    ...content_styles
})

export default style
