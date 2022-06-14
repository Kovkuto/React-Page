import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { usersAPI } from "../../api/api"
import { updateObjectInArray } from "../../utils/object-helpers"

let initialState = {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followInProgress: [] as number[]
}

export type UsersStateType = typeof initialState 

interface ISetFollowed {
    id: number,
    followed: boolean
}

interface ISetFollowInProgress {
    userId: number,
    isFetching: boolean
}

const usersSlice = createSlice({
    name: "usersReducer",
    initialState: initialState as UsersStateType,
    reducers: {
        setUsers(state, action) {
            state.usersData = action.payload
        },
        setFollowed: {
            reducer: (state, action: PayloadAction<ISetFollowed>) => {
                state.usersData = updateObjectInArray(state.usersData, action.payload.id, "id", { followed: action.payload.followed })
            },
            prepare: (id: number, followed: boolean) => ({
                    payload: {
                    id,
                    followed
                }})
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setTotalCount: (state, action: PayloadAction<number>) => {
            state.totalUsersCount = action.payload
        },
        setIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        },
        setFollowInProgress: {
            prepare: (userId, isFetching) => ({
                payload: {
                    userId,
                    isFetching
                }
            }),
            reducer: (state, action: PayloadAction<ISetFollowInProgress>) => {
                state.followInProgress = action.payload.isFetching
                    ? [...state.followInProgress, action.payload.userId]
                    : state.followInProgress.filter(id => id !== action.payload.userId)
            }
        }
    }
})

export const { setFollowed, setUsers, setCurrentPage, setFollowInProgress, setIsFetching, setTotalCount } = usersSlice.actions

export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: Function) => {
    dispatch(setIsFetching(true))
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setTotalCount(data.totalCount))
    dispatch(setUsers(data.items))
    dispatch(setIsFetching(false))
}

export const followUnfollowFlow = (id: number, followed: boolean) => async (dispatch: Function) => {
    dispatch(setFollowInProgress(id, true))
    try {
        let apiMethod
        if (followed) apiMethod = usersAPI.follow.bind(this)
        else apiMethod = usersAPI.unfollow.bind(this)

        const data = await apiMethod(id)
        if (!data.resultCode) {
            dispatch(setFollowed(id, followed))
            dispatch(setFollowInProgress(id, false))
        }
    } catch (err) {
        console.error(err);
    }
}

export default usersSlice.reducer
