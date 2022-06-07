import moxios from "moxios";
import { getUsers } from "./usersReducer";
import store from "../redux-store"
import axios from "axios";
import { instance } from "../../api/api";


describe('usersReduce', () => {
    beforeEach(function () {
        moxios.install(instance)
    })

    afterEach(function () {
        moxios.uninstall(instance)
    })

    test('should fetch users correctly', async () => {
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
})