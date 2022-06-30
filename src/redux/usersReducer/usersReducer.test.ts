import { createExpectedState } from './../../utils/object-helpers';
import { createTestStore } from './../redux-store';
import { instance } from './../../api/api';
import moxios from 'moxios';
import usersReducer, { followUnfollowFlow, getUsers, UsersStateType } from "./usersReducer";
import { ResponseType, ResultCodes } from "../../api/api";
import { usersAPI } from '../../api/usersAPI';
import { AxiosInstance } from 'axios';
// jest.mock('./../../api/usersAPI')

const initialState: UsersStateType = usersReducer(undefined, {type: ""})


// const usersAPIMock: any = usersAPI
// const result: ResponseType = {
//     resultCode: ResultCodes.Success,
//     messages: [],
//     data: {}
// }


// usersAPIMock.follow.mockImplementation(() => "lkajfaj")

// test("", () => {
//     const thunk = followUnfollowFlow(1, true)
//     const dispatchMock = jest.fn()

//     //@ts-ignore
//     thunk(dispatchMock)


//     expect(dispatchMock.mock.calls.length).toBe(4)
// })

describe.skip('usersReduce', () => {
    beforeEach(function () {

        // @ts-ignore
        moxios.install(instance)
    })

    afterEach(function () {
        // @ts-ignore
        moxios.uninstall(instance)
    })

    test('should fetch users correctly', async () => {
        const store = createTestStore(initialState)
        const expectedState = createExpectedState(initialState, {
            usersData: [{
                userId: 1,
                name: "Nikita"
            }],
            totalUsersCount: 10,
        })
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
        await store.dispatch(getUsers(1, 5, {friend: null, term: ""}) as any)
        const newState = store.getState().usersPage
        expect(newState).toEqual(expectedState)
    })

    test('should follow correctly', async () => {
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

        await store.dispatch(followUnfollowFlow(1, true) as any)
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

        await store.dispatch(followUnfollowFlow(1, false) as any)
        expect(store.getState().usersPage).toEqual(expectedState)
    })
})