import { UserType, UsersFormFilter } from './../redux/usersReducer/usersReducer';
import { hasValueStrQ, instance, ResponseType } from './api';

type UsersGet = {
    items: UserType[]
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5, filter: UsersFormFilter) {
        return instance.get<UsersGet>(`users?page=${currentPage}&count=${pageSize}` + hasValueStrQ(filter)).then(response => response.data)
    },
    follow(id: number) {
        return instance.post<ResponseType>(`follow/${id}`).then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete<ResponseType>(`follow/${id}`).then(response => response.data)
    }
}
