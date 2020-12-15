import { StyleSheet } from "react-native"
import colors from "../../values/colors"

const image_size = 36
const image_pad = (48 - 4) / 2 // half contain - border

const card = {
    display: "flex",
    flexDirection: "row",
}

const image = {
    height: 36,
    width: 36,

    marginBottom: 4,
    marginTop: 4,
    marginLeft: 4,
    marginRight: 4,

    borderRadius: 36,

    backgroundColor: colors.light,
}

const text = {
    marginBottom: "auto",
    marginTop: "auto",
    marginRight: "auto",
    marginLeft: 4,

    color: colors.light,
}

export default StyleSheet.create({
    card,
    image,
    text,
})
