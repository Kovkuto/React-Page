import moxios from "moxios";
import { followUnfollowFlow, getUsers } from "./usersReducer";
import { createTestStore } from "../redux-store.js"
import { instance } from "../../api/api";


describe.skip('usersReduce', () => {
    beforeEach(function () {
        moxios.install(instance)
    })

    afterEach(function () {
        moxios.uninstall(instance)
    })

    test('should fetch users correctly', async () => {
        const store = createTestStore()
        const expectedState = {
            usersData: [{
                userId: 1,
                name: "Nikita"
            }],
            pageSize: 5,
            totalUsersCount: 10,
            currentPage: 1,
            isFetching: false,
            followInProgress: []
        }
        moxios.wait(() => {
            let request = moxios.requests.get("get", "users?page=1&count=5")
            request.respondWith(
                {
                    status: 200,
                    response: {
                        items: [{
                            userId: 1,
                            name: "Nikita",
                        }],
                        totalCount: 10,
                    }
                })
        })
        await store.dispatch(getUsers(1, 5))
        const newState = store.getState().usersPage
        expect(newState).toEqual(expectedState)
    })

    test('should follow correctly', async () => {
        const store = createTestStore({
            usersPage: {
                usersData: [{
                    userId: 1,
                    name: "Nikita",
                    followed: false
                }],
                pageSize: 5,
                totalUsersCount: 10,
                currentPage: 1,
                isFetching: false,
                followInProgress: []
            }
        })
        const expectedState = {
            usersData: [{
                userId: 1,
                name: "Nikita",
                followed: true
            }],
            pageSize: 5,
            totalUsersCount: 10,
            currentPage: 1,
            isFetching: false,
            followInProgress: []
        }
        moxios.wait(() => {
            let request = moxios.requests.get("post", "follow/1")
            request.respondWith(
                {
                    status: 200,
                    response: {
                        resultCode: 0,
                        messages: ['Ok'],
                        data: {}
                    }
                })
        })

        await store.dispatch(followUnfollowFlow(1, true))
        expect(store.getState().usersPage).toEqual(expectedState)
    })

    test('should unfollow correctly', async () => {
        const store = createTestStore({
            usersPage: {
                usersData: [{
                    userId: 1,
                    name: "Nikita",
                    followed: true
                }],
                pageSize: 5,
                totalUsersCount: 10,
                currentPage: 1,
                isFetching: false,
                followInProgress: []
            }
        })
        const expectedState = {
            usersData: [{
                userId: 1,
                name: "Nikita",
                followed: false
            }],
            pageSize: 5,
            totalUsersCount: 10,
            currentPage: 1,
            isFetching: false,
            followInProgress: []
        }
        moxios.wait(() => {
            let request = moxios.requests.get("delete", "follow/1")
            request.respondWith(
                {
                    status: 200,
                    response: {
                        resultCode: 0,
                        messages: ['Ok'],
                        data: {}
                    }
                })
        })

        await store.dispatch(followUnfollowFlow(1, false))
        expect(store.getState().usersPage).toEqual(expectedState)
    })
})