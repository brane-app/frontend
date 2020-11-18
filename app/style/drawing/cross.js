import { StyleSheet } from "react-native"

import colors from "../../values/colors"

const horizontal_line = {
    position: "absolute",
    width: "90%",
    height: 2,

    marginLeft: "auto",
    marginRight: "auto",

    backgroundColor: colors.light,
}

const cross_things = {
    cross: {
        height: "100%",
        width: "100%",

    },

    horizontal_line: {
        ...horizontal_line,
    },

    vertical_line: {
        ...horizontal_line,

        transform: [
            {rotate: "90deg"}
        ],
    },
}


const cross = StyleSheet.create({
    ...cross_things
})

export default cross
