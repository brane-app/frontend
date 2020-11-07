import Native from "react-native"

import feed from "./feed"
import login from "./login"
import profile from "./profile"

const views = Native.StyleSheet.flatten ([
    feed,
    login,
    profile,
])

export default views
