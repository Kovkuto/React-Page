const SEND_MESSAGE = "SEND-MESSAGE"

let initialState = {
    dialogsUsersData: [
        {id: 1, name: "Kovkuto"},
        {id: 2, name: "Nikita"}
    ],
    dialogsMessagesData: [
        {
            id: 1,
            text: "Hello",
            isMe: false,
            ava: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80"
        },
        {
            id: 2,
            text: "Hello",
            isMe: true,
            ava: "https://media1.popsugar-assets.com/files/thumbor/yDmG0ifN-I44d2uG4EIDwWg2yfE/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2018/08/21/616/n/24155406/a4387395142b050c_charles-deluvio-550068-unsplash/i/Cute-Photos-Dogs.jpg"
        },
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: state.dialogsMessagesData.length + 1,
                text: action.messageText,
                isMe: action.isMe,
                ava: ""
            }
            return  {
                ...state,
                dialogsMessagesData: [...state.dialogsMessagesData, newMessage]
            }
        default:
            return state
    }
}

export const sendMessage = (messageText, isMe) => ({
    type: SEND_MESSAGE,
    isMe,
    messageText
})

export default dialogsReducer
