import { ResponseType, instance } from './api';

type AuthMe = ResponseType<{
    id: number
    email: string
    login: string
}>

type AuthLogin = ResponseType<{
    userId: number
}>

export const authAPI = {
    me() {
        return instance.get<AuthMe>("auth/me").then((res) => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha = false) {
        return instance.post<AuthLogin>("auth/login", {email, password, rememberMe, captcha}).then(response => response.data)
    },
    logout() {
        return instance.delete<AuthLogin>("auth/login").then(response => response.data)
    }
}