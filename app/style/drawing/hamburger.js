import { StyleSheet } from "react-native"

const hamburger = StyleSheet.create({
    hamburger: {
        height: 32,
        width: 32,

    },

    hamburger_wrap: {
        display: "flex",
        justifyContent: "space-evenly",

        height: "100%",
        width: "100%",
    },

    hamburger_line: {
        width: "70%",
        height: "7%",

        marginLeft: "auto",
        marginRight: "auto",

        backgroundColor: "black",
    },
})

export default hamburger
