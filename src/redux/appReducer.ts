import { createSlice } from "@reduxjs/toolkit"
import { auth } from "./authReducer"


const initialState = {
    initialized: false
}

export type AppStateType = typeof initialState

const appSlice = createSlice({
    name: "app",
    initialState: initialState as AppStateType,
    reducers: {
        setInitialized: (state) => {
            state.initialized = true
        }
    }
})

export const {setInitialized} = appSlice.actions

export const initialzeApp = () => (dispatch: Function) => {
    Promise.all([dispatch(auth())]).then(() => {
        dispatch(setInitialized())
    })
}

export default appSlice.reducer