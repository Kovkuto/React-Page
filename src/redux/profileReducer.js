import { profileAPI } from "../api/api"

const ADD_POST = "react_one/profileReducer/ADD-POST"
const SET_CURRENT_PROFILE = "react_one/profileReducer/SET-CURRENT-PROFILE"
const SET_STATUS = "react_one/profileReducer/SET-STATUS"
const SET_IS_FETCHING = "react_one/profileReducer/SET_IS_FETCHING"
const DELETE_POST = "react_one/profileReducer/DELETE-POST"

let initialState = {
    currentProfile: {},
    myPostsData: [
        {id: 1, text: "Hello from Kovkuto", likes: 10}
    ],
    status: "",
    isFetching: false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.myPostsData.length + 1,
                text: action.text,
                likes: 10
            }
            return {
                ...state,
                myPostsData: [...state.myPostsData, newPost]
            }
        case SET_CURRENT_PROFILE:
            return {
                ...state,
                currentProfile: action.profile 
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case DELETE_POST:
            return {
                ...state,
                myPostsData: state.myPostsData.filter(post => post.id !== action.id)
            }
        default:
            return state
    }
}


export const addPost = (text) => ({type: ADD_POST, text})

export const setCurrentProfile = (profile) => ({
    type: SET_CURRENT_PROFILE,
    profile: profile
})

export const setStatus = (status) => ({
    type: SET_STATUS,
    status
})

export const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING,
    isFetching
})

export const deletePost = (id) => ({
    type: DELETE_POST,
    id
})

export const getProfile = (id) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try{
        const data = await profileAPI.getProfile(id)
        dispatch(setCurrentProfile(data))
    } catch (err) {
        console.log(err);
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const getStatus = (id) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try{
        const status = await profileAPI.getStatus(id)
        dispatch(setStatus(status))
    } catch (err) {
        console.log(err);
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const updateStatus = (status) => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (err) {
        console.error(err);
    }
}


export default profileReducer
