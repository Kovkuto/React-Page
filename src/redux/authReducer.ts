import { actions, BaseThunk } from './redux-store';
import { securityAPI } from './../api/securityAPI';
import { authAPI } from './../api/authAPI';
import { ResultCodesForCaptcha } from './../api/api';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { stopSubmit } from "redux-form"
import { ResultCodes } from "../api/api"


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

type Thunk = BaseThunk<actions<typeof authSlice.actions>>

export const auth = (): Thunk => async (dispatch) => {
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

export const login = (email: string, password: string, rememberMe: boolean, captcha: any): Thunk => async (dispatch) => {
    try {
        const data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodes.Success) {
            dispatch(auth())
        } else {
            if (data.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptcha())
            }

            dispatch(stopSubmit("login", {_error: data.messages}) as any)
        }
    } catch(err) {
        console.error(err);
    }
}

export const logout = (): Thunk => async (dispatch) => {
    try{
        const data = await authAPI.logout()
        if (data.resultCode === ResultCodes.Success) {
            dispatch(setAuthUserData(null, null, null, false))
        } else {
            dispatch(stopSubmit("login", {_error: data.messages}) as any)
        }
    } catch(err) {
        console.error(err);
    }
}

export const getCaptcha = (): Thunk => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authSlice.reducer
