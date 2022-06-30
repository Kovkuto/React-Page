import { createSelector } from 'reselect';
import { StateType } from './../redux-store';


const isAuthSelector = (state: StateType) => state.auth.isAuth
const loginSelector = (state: StateType) => state.auth.login

export const getIsAuth = createSelector(isAuthSelector, isAuth => isAuth)
export const getLogin = createSelector(loginSelector, login => login)
