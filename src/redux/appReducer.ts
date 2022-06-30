import { BaseThunk, actions } from './redux-store';
import { createSlice, Action } from "@reduxjs/toolkit"
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

type Thunk = BaseThunk<actions<typeof appSlice.actions>>

export const {setInitialized} = appSlice.actions

export const initialzeApp = (): Thunk => (dispatch) => {
    Promise.all([dispatch(auth())]).then(() => {
        dispatch(setInitialized())
    })
}

export default appSlice.reducer