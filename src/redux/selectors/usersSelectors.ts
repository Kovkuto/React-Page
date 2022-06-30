import { UserType, getUsers } from './../usersReducer/usersReducer';
import { StateType } from './../redux-store';
import { createSelector } from "reselect"


const getUsersDataSelector = (state: StateType)=> state.usersPage.usersData

const getPageSizeSelector = (state: StateType) => state.usersPage.pageSize

const getTotalUsersCountSelector = (state: StateType) => state.usersPage.totalUsersCount

const getCurrentPageSelector = (state: StateType) => state.usersPage.currentPage

const getIsFetchingSelector = (state: StateType) => state.usersPage.isFetching

const getFollowInProgressSelector = (state: StateType) => state.usersPage.followInProgress

const getUsersFilterSelctor = (state: StateType) => state.usersPage.filter

export const getUsersData = createSelector(getUsersDataSelector, users => users)

export const getPageSize = createSelector(getPageSizeSelector, pageSize => pageSize)

export const getTotalUsersCount = createSelector(getTotalUsersCountSelector, totalUsersCount => totalUsersCount)

export const getCurrentPage = createSelector(getCurrentPageSelector, currentPage => currentPage)

export const getIsFetching = createSelector(getIsFetchingSelector, isFetching => isFetching)

export const getFollowInProgress = createSelector(getFollowInProgressSelector, followInProgress => followInProgress)

export const getUsersFilter = createSelector(getUsersFilterSelctor, filter => filter)