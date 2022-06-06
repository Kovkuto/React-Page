import moxios from "moxios";
import { getUsers } from "./usersReducer";
import store from "../redux-store"
import axios from "axios";

let expectedState = {
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


describe.skip('usersReduce', () => {
    beforeEach(() => {
        moxios.install(axios)
    })

    afterEach(() => {
        moxios.uninstall()
    })

    test('should fetch users correctly', async () => {
        moxios.wait(() => {
            let request = moxios.requests.get("get", "https://social-network.samuraijs.com/api/1.0/users?page=1&count=5")
            request.respondWith(
                {
                    items: [{
                        userId: 1,
                        name: "Nikita",
                    }],
                    totalCount: 10
                })
        })
        moxios.stubRequest("https://social-network.samuraijs.com/api/1.0/users?page=1&count=5")
        store.dispatch(getUsers(1, 5)).then(() => {})
        const newState = store.getState().usersPage
        console.log(newState)
    })
})