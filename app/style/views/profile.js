import { StyleSheet } from "react-native"

import colors from "../../values/colors"

const profile_view = {
}

const info = {
    flexGrow: 1,

    display: "flex",

    maxWidth: "100%",

    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "auto"
}

const info_contain = {
    display: "flex",
    flexDirection: "row",

    marginTop: "auto",
    marginBottom: "auto",
}

const card_contain = {
    height: "30%",

    paddingRight: "5%",
    paddingLeft: "5%",

    backgroundColor: colors.gray,
}

const nick_contain = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
}

const nick = {
    fontSize: 32,
}

const image = {
    height: 128,
    width: 128,

    marginTop: "auto",
    marginBottom: "auto",

    borderRadius: 64,
    borderWidth: 3,
    borderColor: colors.blue,

}

const stats_contain = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
}

const stat = {
    display: "flex",
    justifyContent: "center",

    fontSize: 11,
}

const stat_data = {
    textAlign: "center",

    fontSize: 13,
    width: "100%",
}

const stat_label = {
    textAlign: "center",

    fontSize: 9,
    width: "100%",
}

const since_contain = {
    bottom: 0,

    fontSize: 11,

    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
}

const since = {
    flexGrow: 1,
    textAlign: "center",

    fontSize: 11,
    color: colors.gray_text_dark,

    marginLeft: "auto",
    marginRight: "auto",
}

const content_contain = {
    height: "70%",
    marginLeft: "auto",
    marginRight: "auto",
}

const content_loading = {
    display: "flex",
    justifyContent: "center",

    width: "100%",
    height: "100%",
}

const content_loading_image = {
    marginLeft: "auto",
    marginRight: "auto",
}

const content_loading_text = {
    textAlign: "center",
}

export default StyleSheet.create({
    card_contain,
    content_contain,
    content_loading_image,
    content_loading_text,
    content_loading,
    image,
    info_contain,
    info,
    nick_contain,
    nick,
    profile_view,
    since_contain,
    since,
    stat_data,
    stat_label,
    stat,
    stats_contain,
})
