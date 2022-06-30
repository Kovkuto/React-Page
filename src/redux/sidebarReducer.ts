export type SidebarStateType = typeof initialState

export type TitleType = {
    id: number
    text: string
    url: string
}

const initialState = {
    titles: [
        {id: 1 , text: "Profile", url: "/profile/me" },
        {id: 2, text: "Dialogs", url: "/dialogs" },
        {id: 6, text: "Chat", url: "/chat"},
        {id: 3, text: "News", url: "/news" },
        {id: 4, text: "Find Friends", url: "/find-users"},
        {id: 5, text: "Settings", url: "/settings" },
    ],
    friends: [
        { id: 1, name: "Nikita", ava: "https://media1.popsugar-assets.com/files/thumbor/yDmG0ifN-I44d2uG4EIDwWg2yfE/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2018/08/21/616/n/24155406/a4387395142b050c_charles-deluvio-550068-unsplash/i/Cute-Photos-Dogs.jpg" },
        { id: 2, name: "Kovkuto", ava: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80" }
    ]
}

const sidebarReducer = (state = initialState, action: {type: string, payload: any}) => {
    switch(action.type) {
        default:
            return state
    }
}

export default sidebarReducer