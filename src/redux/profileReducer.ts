import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { stopSubmit } from "redux-form"
import { profileAPI, ResultCodes } from "../api/api"

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
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    websit: string,
    youtube: string,
    mainLink: string
}

export interface IPhotos {
    small: string | null,
    large: string | null
}


export interface IProfile {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: IContacts,
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

export const getProfile = (id: number) => async (dispatch: Function) => {
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

export const getStatus = (id: number) => async (dispatch: Function) => {
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

export const updateStatus = (status: string) => async (dispatch: Function) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodes.Success) {
            dispatch(setStatus(status))
        }
    } catch (err) {
        console.error(err);
    }
}

export const setPhoto = (file: any) => async (dispatch: Function) => {
    try {
        const response = await profileAPI.setPhoto(file)

        if (response.resultCode === ResultCodes.Success) {
            dispatch(savePhotoSuccess(response.data))
        }
    } catch (error) {
        console.error(error);
    }
}

export const setProfile = (profile: IProfile) => async (dispatch: Function, getState: Function) => {
    const response = await profileAPI.setProfile(profile)

    if (response.data.resultCode === ResultCodes.Success) {
        dispatch(getProfile(getState().auth.userId))
    } else {
        stopSubmit("profile", { _error: response.data.messages[0] })
    }
}

export default profileSlice.reducer
