import { usersAPI } from "../api/api"
import { updateObjectInArray } from "../utils/object-helpers"

const SET_FOLLOWED_USER = "SET-FOLLOWED-USER"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
const SET_IS_FETCHING = "TOGGLE-IS-FETCHING"
const SET_FOLLOW_IN_PROGRESS = "SET-IS-FOLLOW-IN-PROGRESS"

let initialState = {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 0,
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
        case SET_FOLLOWED_USER:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.id, "id", {followed: action.followed})
            }
        case SET_CURRENT_PAGE:
            let newState = {
                ...state,
                currentPage: action.currentPage
            }
            return newState
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
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

export const setFollowed = (userId, followed) => ({
    type: SET_FOLLOWED_USER,
    userId: userId,
    followed: followed
})

export const setUsers = (users) => ({
    type: SET_USERS,
    users: users
})

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
})

export const setTotalCount = (totalUsersCount) => ({
    type: SET_TOTAL_COUNT,
    totalUsersCount: totalUsersCount
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

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setTotalCount(data.totalCount))
        dispatch(setUsers(data.items))
        dispatch(setIsFetching(false))
    } catch (err) {
        console.log(err);
    }
}

export const followUnfollowFlow = (id, followed) => async (dispatch) => {
    dispatch(setFollowInProgress(true, id))
    try {
        let apiMethod
        if (followed) apiMethod = usersAPI.follow.bind(this)
        else apiMethod = usersAPI.unfollow.bind(this)

        const data = await apiMethod(id)
        if (!data.resultCode) {
            dispatch(setFollowed(id, followed))
        }
    } catch (err) {
        console.error(err);
    } finally {
        dispatch(setFollowInProgress(false, id))
    }
}

export default usersReducer
