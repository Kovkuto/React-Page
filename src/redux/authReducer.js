import { reset } from "redux-form"
import { stopSubmit } from "redux-form"
import { authAPI } from "../api/api"

const SET_AUTH_USER_DATA = "SET-USER-DATA"

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}


export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    data: {
        userId: userId,
        email: email,
        login: login,
        isAuth: isAuth
    }
})

export const auth = () => (dispatch) => {
    return authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let { email, id, login } = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
        .catch(err => {
            console.log(err)
        })
}

export const login = (email, password, rememberMe, captcha) => (dispatch) => {
    authAPI.login(email, password, rememberMe, captcha)
        .then(data => {
            if (data.resultCode === 0) {
                console.log(data);
                dispatch(auth()).then()
            } else {
                dispatch(stopSubmit("login", {_error: data.messages}))
            }
        })
        .catch(err => console.log(err))
}

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
                dispatch(reset("login"))
            } else {
                dispatch(stopSubmit("login", {_error: data.messages}))
            }
        })
        .catch(err => console.error(err))
}

export default authReducer
