import { profileAPI } from "../api/api"

const ADD_POST = "ADD-POST"
const SET_CURRENT_PROFILE = "SET-CURRENT-PROFILE"
const SET_STATUS = "SET-STATUS"
const SET_IS_FETCHING = "SET_IS_FETCHING"

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

export const getProfile = (id) => (dispatch) => {
    dispatch(setIsFetching(true))
    profileAPI.getProfile(id)
        .then(data => {
            dispatch(setCurrentProfile(data))
            dispatch(setIsFetching(false))
        })
        .catch(err => console.log(err))
}

export const getMyProfile = (props) => (dispatch) => {
    dispatch(setIsFetching(true))
    profileAPI.getProfileById(props.id)
        .then(data => {
            dispatch(setCurrentProfile(data))
            dispatch(setIsFetching(false))
        })
        .catch(err => console.log(err))
}

export const getStatus = (id) => (dispatch) => {
    profileAPI.getStatus(id)
        .then(status => dispatch(setStatus(status)))
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setStatus(status))
            } else {
                
            }
        })
}


export default profileReducer
