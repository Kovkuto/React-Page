import { ResultCodesForCaptcha } from './../api/api';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { reset } from "redux-form"
import { stopSubmit } from "redux-form"
import { authAPI, ResultCodes, securityAPI } from "../api/api"


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type AuthStateType = typeof initialState

interface ISetAuthUserData {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState as AuthStateType,
    reducers: {
        setAuthUserData: {
            reducer: (state, action: PayloadAction<ISetAuthUserData>) => ({
                ...state,
                ...action.payload
            }),
            prepare: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
                payload: {
                    userId,
                    email,
                    login,
                    isAuth
                }
            })
        },
        getCaptchaUrlSuccess: (state, action: PayloadAction<string>) => {
            state.captchaUrl = action.payload
        }
    }
})

export const {getCaptchaUrlSuccess, setAuthUserData} = authSlice.actions

export const auth = () => async (dispatch: Function) => {
    try{
        const response = await authAPI.me()
        if (response.resultCode === ResultCodes.Success) {
            let { email, id, login } = response.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    } catch(err) {
        console.error(err);
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: Function) => {
    try {
        const data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodes.Success) {
            dispatch(auth()).then()
        } else {
            if (data.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
                console.log("captcha");
                dispatch(getCaptcha())
            }

            dispatch(stopSubmit("login", {_error: data.messages}))
        }
    } catch(err) {
        console.error(err);
    }
}

export const logout = () => async (dispatch: Function) => {
    try{
        const data = await authAPI.logout()
        if (data.resultCode === ResultCodes.Success) {
            dispatch(setAuthUserData(null, null, null, false))
            dispatch(reset("login"))
        } else {
            dispatch(stopSubmit("login", {_error: data.messages}))
        }
    } catch(err) {
        console.error(err);
    }
}

export const getCaptcha = () => async (dispatch: Function) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authSlice.reducer
