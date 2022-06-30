import { chatAPI, MessagesReceivedSubscriber, Status } from './../api/chatAPI';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {v1} from "uuid"

export type ChatMessage = {
    messageId: string
    userId: number
    userName: string
    message: string
    photo: string
}

const initialState = {
    messages: [] as ChatMessage[],
    status: 'pending' as Status
}

const chatReducer = createSlice({
    name: "chatReducer",
    initialState: initialState,
    reducers: {
        messagesReceived: (state, action: PayloadAction<ChatMessage[]>) => {
            state.messages = [...state.messages, ...action.payload.map(el => ({...el, messageId: v1()}))].slice(-99)
        },
        reloadMessages: (state) => {
            state.messages = []
        },
        statusChanged: (state, action: PayloadAction<Status>) => {
            state.status = action.payload
        }
    }
})

let _messageHandler: MessagesReceivedSubscriber | null = null

let messageHandler = (dispatch: Function) => {
    if (!_messageHandler) {
        _messageHandler = (messages: ChatMessage[]) => {
            dispatch(messagesReceived(messages))
        }
    }

    return _messageHandler
}

let _statusHandler: (status: Status) => void | null 

const statusHandler = (dispatch: Function) => {
    if (_statusHandler !== null) {
        _statusHandler = (status: Status) => {
            dispatch(statusChanged(status))
        }
    }

    return _statusHandler
}

export const startMessagesListening = () => async (dispatch: Function) => {
    dispatch(reloadMessages())
    chatAPI.createWSChanel()
    chatAPI.subscribe('messageReceived', messageHandler(dispatch))
    chatAPI.subscribe('statusChanged', statusHandler(dispatch))
}

export const stopMessagesListening = () => async (dispatch: Function) => {
    chatAPI.unsubscribe('messageReceived', messageHandler(dispatch))
    chatAPI.unsubscribe('statusChanged', statusHandler(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string | null) => (dispatch: Function) => {
    if (message) chatAPI.sendMessage(message)
}

export const { messagesReceived, statusChanged, reloadMessages } = chatReducer.actions

export default chatReducer.reducer
