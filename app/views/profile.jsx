import React from "react"
import {
    View
} from "react-native"

import imonke from "imonke"

import style_generic from "../style/generic"
import global_state from "../state"

const style = {
    generic: style_generic,
}

class ProfileCard extends React.Component {
    constructor (opts = {}) {
        super()
        this.client = opts.client
    }

    render () {
        return <View/>
    }
}

class ProfileView extends React.Component {
    constructor (opts = {}) {
        super(opts)
        this.client = opts.client || global_state.client || (new imonke.Client())
    }

    get profile_card () {
        return <ProfileCard client = {this.client}/>
    }

    render () {
        return (
            <View style = {style.generic.view}>
                {this.profile_card}
            </View>
        )
    }
}

export default ProfileView
