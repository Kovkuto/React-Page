import axios from "axios";


export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "89039c91-b86b-43a2-bca2-43612891b2d2"
    }
})

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

export type ResponseType<D = {}> = {
    resultCode: ResultCodes | ResultCodesForCaptcha
    messages: string[]
    data: D
}

export function hasValueStrQ<T extends { [key: string]: any }>(el: T, clearStart: boolean = false): string {
    let str: string = ""
    Object.keys(el).map(k => {
        str = str + (el[k] !== undefined && el[k] !== null && el[k] !== "" ? `&${k}=${el[k]}` : "")
    })

    if (clearStart) return str.slice(1)
    return str
}

export const hasValueObjQ = <T extends { [key: string]: any }>(obj: T): { [key: string]: string } => {
    let qObj: { [key: string]: string } = {}
    Object.keys(obj).map(k => {
        if (obj[k] !== undefined && obj[k] !== null && obj[k] !== "") qObj[k] = String(obj[k])
    })

    return qObj
}
