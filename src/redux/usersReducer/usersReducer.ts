import { usersAPI } from './../../api/usersAPI';
import { actions } from './../redux-store';
import { IPhotos } from './../profileReducer';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { updateObjectInArray } from "../../utils/object-helpers"
import { BaseThunk } from '../redux-store';



let initialState = {
    usersData: [] as UserType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followInProgress: [] as number[],
    filter: {
        term: "",
        friend: null as null | boolean
    }
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

export type UsersFormFilter = typeof initialState.filter

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
                }
            })
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
        },
        setFilter: (state, action: PayloadAction<UsersFormFilter>) => {
            state.filter = action.payload
        }
    }
})

export const { setIsFetching, setCurrentPage, setFollowInProgress, setFollowed, setTotalCount, setUsers, setFilter } = usersSlice.actions

type Thunk = BaseThunk<actions<typeof usersSlice.actions>>

export const getUsers = (currentPage: number, pageSize: number, filter: UsersFormFilter): Thunk => async (dispatch, getState) => {
    dispatch(setIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    dispatch(setFilter(filter))
    const data = await usersAPI.getUsers(currentPage, pageSize, filter)
    dispatch(setTotalCount(data.totalCount))
    dispatch(setUsers(data.items))
    dispatch(setIsFetching(false))
}

export const followUnfollowFlow = (id: number, followed: boolean): Thunk => async (dispatch) => {
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
