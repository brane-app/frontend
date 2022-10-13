import axios from "axios"

import {api, BRANE_API} from "./api"

interface token {
    token: string,
    secret: string,
    expires: number,
}

export const auth_password = async (email: string, password: string): Promise<token> => {
    const response = await axios({
        baseURL: BRANE_API,
        url: "/auth",
        method: "POST",
        data: { email, password },
    })

    return response.data.auth 
}

export const auth_register = async (nick: string, email: string, password: string, bio: string):  Promise<token> => {
    await axios({
        baseURL: BRANE_API,
        url: "/user",
        method: "POST",
        data: { nick, email, password }
    })

    return await auth_password(email, password)
}