import { usersAPI } from "../api/api"

const FOLLOW_USER = "FOLLOW-USER"
const UNFOLLOW_USER = "UNFOLLOW-USER"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
const SET_IS_FETCHING = "TOGGLE-IS-FETCHING"
const SET_FOLLOW_IN_PROGRESS = "SET-IS-FOLLOW-IN-PROGRESS"

let initialState = {
    usersData: [],
    pageSize: 5,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                usersData: action.users
            }
        case FOLLOW_USER:
            return {
                ...state,
                usersData: [...state.usersData].map(user => user.id === action.userId ? {
                    ...user,
                    followed: true
                } : user)
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                usersData: [...state.usersData].map(user => user.id === action.userId ? {
                    ...user,
                    followed: false
                } : user)
            }
        case SET_CURRENT_PAGE:
            let newState = {
                ...state,
                currentPage: action.currentPage
            }
            console.log(newState);
            return newState
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_FOLLOW_IN_PROGRESS:
            return {
                ...state,
                followInProgress: action.isFetching
                    ? [...state.followInProgress, action.userId]
                    : state.followInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

export const setFollow = (userId) => ({
    type: FOLLOW_USER,
    userId: userId
})

export const setUnfollow = (userId) => ({
    type: UNFOLLOW_USER,
    userId: userId
})

export const setUsers = (users) => ({
    type: SET_USERS,
    users: users
})

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
})

export const setTotalCount = (totalCount) => ({
    type: SET_TOTAL_COUNT,
    totalCount: totalCount
})

export const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING,
    isFetching: isFetching
})

export const setFollowInProgress = (isFetching, userId) => ({
    type: SET_FOLLOW_IN_PROGRESS,
    isFetching,
    userId
})

export const getUsers = (currentPage, pageSize) => (dispatch) => {
    dispatch(setIsFetching(true))
    usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(setTotalCount(data.totalCount))
            dispatch(setUsers(data.items))
            dispatch(setIsFetching(false))
        })
        .catch(err => console.log(err.response.status))

}

export const follow = (id) => (dispatch) => {
    dispatch(setFollowInProgress(true, id))
    usersAPI.follow(id)
        .then(data => {
            if (!data.resultCode) {
                dispatch(follow(id))
                dispatch(setFollow(id))
            }
            dispatch(setFollowInProgress(false, id))
        })
        .catch(err => console.log(err.response.status))
}

export const unfollow = (id) => (dispatch) => {
    dispatch(setFollowInProgress(true, id))
    usersAPI.unfollow(id)
        .then(data => {
            if (!data.resultCode) {
                dispatch(unfollow(id))
                dispatch(setUnfollow(id))
            }
            dispatch(setFollowInProgress(false, id))
        })
        .catch(err => console.log(err.response.status))
}

export default usersReducer
