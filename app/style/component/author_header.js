import { StyleSheet } from "react-native"
import colors from "../../values/colors"

const contain = {
    display: "flex",
    flexDirection: "row",

    width: "100%",
    height: 48,

    marginBottom: 4,
    marginTop: 4,
    marginLeft: 16,
    marginRight: 16,
}

// TODO this is duplicated from ./alt_card.js
const image = {
    height: 40,
    width: 40,

    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,

    borderRadius: 36,

    backgroundColor: colors.light,
}

const text = {
    marginTop: 4,
    marginBottom: 4,
    marginRight: 4,

    paddingTop: "auto",
    paddingBottom: "auto",

}

export default StyleSheet.create({
    contain,
    image,
    text,
})
