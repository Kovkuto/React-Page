import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";
import { configureStore } from "@reduxjs/toolkit";

export let rootReducers = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
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

// @ts-ignore
window.store = store

export type StateType = ReturnType<typeof rootReducers>

export default store