import { StyleSheet } from "react-native"

const image = {
    resizeMode: "contain",
}

const contain_image = {
    display: "flex",

    marginBottom: "auto",
    marginTop: "auto",

    width: "100%",
    height: "100%",
}

const contain_image_container = {
    justifyContent: "center",
    flexGrow: 1,
}

export default StyleSheet.create({
    image,
    contain_image,
    contain_image_container,
})
