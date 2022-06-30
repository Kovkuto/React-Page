import { Action, combineReducers } from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";
import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatReducer";

export let rootReducers = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    chatPage: chatReducer,
    sidebarPage: sidebarReducer,
    usersPage  : usersReducer,
    auth: authReducer,
    form: formReducer
})


const store = configureStore({
  reducer: rootReducers,
  middleware: [thunkMiddleware]
})

export const createTestStore = (initialState={}) => {
  return configureStore({
    reducer: rootReducers,
    middleware: [thunkMiddleware],
    preloadedState: initialState
  })
}

type actionProperties<T> = T extends {[key: string]: (...args: any) => infer U} ? (...args: any) => U : never
export type actions<T> = ReturnType<actionProperties<T>>

export type BaseThunk<A extends Action, R = void> = ThunkAction<R, StateType, unknown, A>

// @ts-ignore
window.store = store

export type StateType = ReturnType<typeof rootReducers>

export default store