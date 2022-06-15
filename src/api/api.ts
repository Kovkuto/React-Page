import { UserType } from './../redux/usersReducer/usersReducer';
import { IProfile, IPhotos } from './../redux/profileReducer';
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

type UsersGet = {
    items: UserType[]
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get<UsersGet>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow(id: number) {
        return instance.post<Common>(`follow/${id}`).then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete<Common>(`follow/${id}`).then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(id: number) {
        return instance.get<IProfile>(`profile/${id}`).then(response => response.data)
    },
    getStatus(id: number) {
        return instance.get<string>(`profile/status/${id}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<Common>(`profile/status`, {
            status
        }).then(response => response.data)
    },
    setPhoto(file: any) {
        var formData = new FormData()
        formData.append("image", file)

        return instance.put<Common & {data: IPhotos}>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => res.data)
    },
    setProfile(data: IProfile) {
        return instance.put<Common>("profile", data)
    }
}

type Common = {
    resultCode: ResultCodes | ResultCodesForCaptcha
    messages: string[]
    data: {}
}

type AuthMe = Common & {
    data: {
        id: number
        email: string
        login: string
    }
}

type AuthLogin = Common & {
    data: {
        userId: number
    }
}

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

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{url: string}>("security/get-captcha-url")
    }
}
