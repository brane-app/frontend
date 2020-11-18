import { StyleSheet } from "react-native"

import colors from "../../values/colors"

const profile_view_styles = {
    profile_view: {
    }
}

const profile_card_styles = {
    info: {
        flexGrow: 1,

        display: "flex",

        maxWidth: "100%",

        marginTop: "auto",
        marginBottom: "auto",
        marginRight: "auto"
    },

    info_contain: {
        display: "flex",
        flexDirection: "row",

        marginTop: "auto",
        marginBottom: "auto",
    },

    card_contain: {
        height: "30%",

        paddingRight: "5%",
        paddingLeft: "5%",

        backgroundColor: colors.gray,
    },

    nick_contain: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },

    nick: {
        fontSize: 32,
    },

    image: {
        height: 128,
        width: 128,

        marginTop: "auto",
        marginBottom: "auto",

        borderRadius: 64,
        borderWidth: 3,
        borderColor: colors.blue,

    },

    stats_contain: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },

    stat: {
        display: "flex",
        justifyContent: "center",

        fontSize: 11,
    },

    stat_data: {
        textAlign: "center",

        fontSize: 13,
        width: "100%",
    },

    stat_label: {
        textAlign: "center",

        fontSize: 9,
        width: "100%",
    },

    since_contain: {
        bottom: 0,

        fontSize: 11,

        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
    },

    since: {
        flexGrow: 1,
        textAlign: "center",

        fontSize: 11,
        color: colors.gray_text_dark,

        marginLeft: "auto",
        marginRight: "auto",
    },
}

const profile_content_styles = {
    content_contain: {
        height: "70%",
        marginLeft: "auto",
        marginRight: "auto",
    },

    content_loading: {
        display: "flex",
        justifyContent: "center",

        width: "100%",
        height: "100%",
    },

    content_loading_image: {
        marginLeft: "auto",
        marginRight: "auto",
    },

    content_loading_text: {
        textAlign: "center",
    },
}

const style = StyleSheet.create({
    ...profile_view_styles,
    ...profile_card_styles,
    ...profile_content_styles,
})

export default style
