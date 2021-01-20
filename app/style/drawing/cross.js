import { StyleSheet } from "react-native"

import colors from "../../values/colors"

const cross = {
    height: "100%",
    width: "100%",

}

const horizontal_line = {
    position: "absolute",
    width: "90%",
    height: 2,

    marginLeft: "auto",
    marginRight: "auto",

    backgroundColor: colors.light,
}

const vertical_line = {
    ...horizontal_line,

    transform: [
        {rotate: "90deg"}
    ],
}

export default StyleSheet.create({
    cross,
    horizontal_line,
    vertical_line,
})
