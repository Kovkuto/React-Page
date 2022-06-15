import { StateType } from './../redux-store';
import { IPhotos } from './../profileReducer';
import { Action, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { usersAPI } from "../../api/api"
import { updateObjectInArray } from "../../utils/object-helpers"
import { ThunkAction } from "redux-thunk"

let initialState = {
    usersData: [] as UserType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followInProgress: [] as number[]
}

export type UsersStateType = typeof initialState 

export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: IPhotos,
    followed: boolean
}

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
        setUsers(state, action: PayloadAction<UserType[]>) {
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

type ActionsType =  ReturnType<typeof setIsFetching> 
| ReturnType<typeof setFollowInProgress>
| ReturnType<typeof setUsers>
| ReturnType<typeof setCurrentPage>
| ReturnType<typeof setTotalCount>
| ReturnType<typeof setFollowed>

type Thunk = ThunkAction<void, StateType, unknown, ActionsType>

export const getUsers = (currentPage: number, pageSize: number): Thunk => async (dispatch) => {
    dispatch(setIsFetching(true))
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setTotalCount(data.totalCount))
    dispatch(setUsers(data.items))
    dispatch(setIsFetching(false))
}

export const followUnfollowFlow = (id: number, followed: boolean): Thunk => async (dispatch) => {
    dispatch(setFollowInProgress(id, true))
    try {
        let apiMethod: Function
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
