import dialogsReducer from "./dialogsReducer"
import profileReducer from "./profileReducer"
import sidebarReducer from "./sidebarReducer"


let store = {
    _state: {
        profilePage: {
            myPostsData: [
                { id: 1, text: "Hello from Kovkuto", likes: 10 }
            ],
            newPostText: ""
        },
        dialogPage: {
            dialogsUsersData: [
                { id: 1, name: "Kovkuto" },
                { id: 2, name: "Nikita" }
            ],
            dialogsMessagesData: [
                { id: 1, text: "Hello", isMe: false, ava: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80" },
                { id: 2, text: "Hello", isMe: true, ava: "https://media1.popsugar-assets.com/files/thumbor/yDmG0ifN-I44d2uG4EIDwWg2yfE/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2018/08/21/616/n/24155406/a4387395142b050c_charles-deluvio-550068-unsplash/i/Cute-Photos-Dogs.jpg" },
            ],
            messageText: ""
        },
        sidebarPage: {
            titles: [
                { text: "Profile", url: "/profile/" },
                { text: "Dialogs", url: "/dialogs/" },
                { text: "News", url: "/news/" },
                { text: "Settings", url: "/settings/" },
            ],
            friends: [
                { id: 1, name: "Nikita", ava: "https://media1.popsugar-assets.com/files/thumbor/yDmG0ifN-I44d2uG4EIDwWg2yfE/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2018/08/21/616/n/24155406/a4387395142b050c_charles-deluvio-550068-unsplash/i/Cute-Photos-Dogs.jpg" },
                { id: 2, name: "Kovkuto", ava: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80" }
            ]
        }
    },
    subscribe(observer) {
        this._renderEntireTree = observer;
    },
    getState(){
        return this._state
    },

    _renderEntireTree () {},
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogPage = dialogsReducer(this._state.dialogPage, action)
        this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action)
        this._renderEntireTree(this)
    }
    
}

export default store
window.store = store
