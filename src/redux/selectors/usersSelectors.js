import { createSelector } from "reselect"



const getUsersDataSelector = state => state.usersPage.usersData

const getPageSizeSelector = state => state.usersPage.pageSize

const getTotalUsersCountSelector = state => state.usersPage.totalUsersCount

const getCurrentPageSelector = state => state.usersPage.currentPage

const getIsFetchingSelector = state => state.usersPage.isFetching

const getFollowInProgressSelector = state => state.usersPage.followInProgress


export const getUsersData = createSelector(getUsersDataSelector, users => users)

export const getPageSize = createSelector(getPageSizeSelector, pageSize => pageSize)

export const getTotalUsersCount = createSelector(getTotalUsersCountSelector, totalUsersCount => totalUsersCount)

export const getCurrentPage = createSelector(getCurrentPageSelector, currentPage => currentPage)

export const getIsFetching = createSelector(getIsFetchingSelector, isFetching => isFetching)

export const getFollowInProgress = createSelector(getFollowInProgressSelector, followInProgress => followInProgress)

