import { actions, BaseThunk } from './redux-store';
import { ResultCodes } from './../api/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { stopSubmit } from "redux-form"
import { profileAPI } from "../api/profileAPI"

let initialState = {
    currentProfile: {} as IProfile,
    myPostsData: [
        { id: 1, text: "Hello from Kovkuto", likes: 10 }
    ] as IPost[],
    status: "",
    isFetching: false
}

export type ProfileStateType = typeof initialState

interface IContacts {
    [key: string]: string
}

export interface IPhotos {
    small: string | null,
    large: string | null
}


export interface IProfile {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: IContacts
    photos: IPhotos
}

interface IPost {
    id: number,
    text: string,
    likes: number
}


const profileSlice = createSlice({
    name: "profile",
    initialState: initialState as ProfileStateType,
    reducers: {
        addPost: (state, action: PayloadAction<string>) => {
            let newPost = {
                id: state.myPostsData.length + 1,
                text: action.payload,
                likes: 10
            }
            state.myPostsData.push(newPost)
        },
        setCurrentProfile: (state, action: PayloadAction<IProfile>) => {
            state.currentProfile = action.payload
        },
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload
        },
        setIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        },
        savePhotoSuccess: (state, action: PayloadAction<IPhotos>) => {
            state.currentProfile.photos = action.payload
        }
    }
})

export const { addPost, setCurrentProfile, setStatus, setIsFetching, savePhotoSuccess } = profileSlice.actions
type Thunk = BaseThunk<actions<typeof profileSlice.actions>>

export const getProfile = (id: number): Thunk => async (dispatch: Function) => {
    dispatch(setIsFetching(true))
    try {
        const data = await profileAPI.getProfile(id)
        dispatch(setCurrentProfile(data))
    } catch (err) {
        console.log(err);
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const getStatus = (id: number): Thunk => async (dispatch: Function) => {
    dispatch(setIsFetching(true))
    try {
        const status = await profileAPI.getStatus(id)
        dispatch(setStatus(status))
    } catch (err) {
        console.log(err);
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const updateStatus = (status: string): Thunk => async (dispatch: Function) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodes.Success) {
            dispatch(setStatus(status))
        }
    } catch (err) {
        console.error(err);
    }
}

export const setPhoto = (file: any): Thunk => async (dispatch: Function) => {
    try {
        const response = await profileAPI.setPhoto(file)

        if (response.resultCode === ResultCodes.Success) {
            dispatch(savePhotoSuccess(response.data))
        }
    } catch (error) {
        console.error(error);
    }
}

export const setProfile = (profile: IProfile): Thunk => async (dispatch: Function, getState: Function) => {
    const response = await profileAPI.setProfile(profile)

    if (response.data.resultCode === ResultCodes.Success) {
        dispatch(getProfile(getState().auth.userId))
    } else {
        stopSubmit("profile", { _error: response.data.messages[0] })
    }
}

export default profileSlice.reducer
