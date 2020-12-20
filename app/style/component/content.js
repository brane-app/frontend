import { StyleSheet } from "react-native"

const content_styles = {
    image: {
        resizeMode: "contain",
    },

    contain_image: {
        display: "flex",

        marginBottom: 16,
        marginTop: 16,
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
