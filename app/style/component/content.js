import { StyleSheet } from "react-native"

const content_styles = {
    image: {
        resizeMode: "contain",
    },

    contain_image: {
        display: "flex",

        marginBottom: "auto",
        marginTop: "auto",

        width: "100%",
        height: "100%",
    },

    contain_image_container: {
        justifyContent: "center",
        flexGrow: 1,
    },
}

const style = StyleSheet.create({
    ...content_styles
})

export default style
