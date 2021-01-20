import { StyleSheet } from "react-native"

const hamburger = {
    height: 32,
    width: 32,

}

const hamburger_wrap = {
    display: "flex",
    justifyContent: "space-evenly",

    height: "100%",
    width: "100%",
}

const hamburger_line = {
    width: "70%",
    height: "7%",

    marginLeft: "auto",
    marginRight: "auto",

    backgroundColor: "black",
}

export default StyleSheet.create({
    hamburger_line,
    hamburger_wrap,
    hamburger,
})
