import axios from "axios";


export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "89039c91-b86b-43a2-bca2-43612891b2d2"
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow(id) {
        return instance.post(`follow/${id}`).then(response => response.data)
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(id) {
        return instance.get(`profile/${id}`).then(response => response.data)
    },
    getProfileById(id) {
        return instance.get(`profile/${id}`).then(response => response.data)
    },
    getStatus(id) {
        return instance.get(`profile/status/${id}`).then(response => response.data)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {
            status
        }).then(response => response.data)
    },
    setPhoto(file) {
        var formData = new FormData()
        formData.append("image", file)

        return instance.put(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}

export const authAPI = {
    me() {
        return instance("auth/me")
    },
    login(email, password, rememberMe, captcha = false) {
        return instance.post("auth/login", {email, password, rememberMe, captcha}).then(response => response.data)
    },
    logout() {
        return instance.delete("auth/login").then(response => response.data)
    }
}
