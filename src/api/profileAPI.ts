import { IProfile, IPhotos } from './../redux/profileReducer';
import { instance, ResponseType } from './api';

export const profileAPI = {
    getProfile(id: number) {
        return instance.get<IProfile>(`profile/${id}`).then(response => response.data)
    },
    getStatus(id: number) {
        return instance.get<string>(`profile/status/${id}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {
            status
        }).then(response => response.data)
    },
    setPhoto(file: any) {
        var formData = new FormData()
        formData.append("image", file)

        return instance.put<ResponseType<IPhotos>>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => res.data)
    },
    setProfile(data: IProfile) {
        return instance.put<ResponseType>("profile", data)
    }
}