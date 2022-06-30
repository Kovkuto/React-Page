import { ChatMessage } from "../redux/chatReducer"

export type MessagesReceivedSubscriber = (messages: ChatMessage[]) => void
export type StatusChangedSubscriber = (status: Status) => void

export type Status = 'pending' | 'ready' | 'error'

let ws: WebSocket

let subscribers = {
    'messageReceived': [] as MessagesReceivedSubscriber[],
    'statusChanged': [] as StatusChangedSubscriber[]
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers["messageReceived"].forEach(sub => sub(newMessages))
}

const closeHandler = () => {
    statusNotify("pending")
    
    setTimeout(() => {
        createWS()
    }, 3000)
}

const statusNotify = (status: Status) => {
    subscribers["statusChanged"].forEach(sub => sub(status))
} 

const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener("message", messageHandler)
    ws?.removeEventListener("open", openHandler)
    ws?.removeEventListener("error", errorHandler)
    ws?.close()
}

const openHandler = () => {
    statusNotify("ready")
}

const errorHandler = () => {
    statusNotify('error')
}

const createWS = () => {
    cleanUp()
    statusNotify("pending")

    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener('close', closeHandler)
    ws.addEventListener("message", messageHandler)
    ws.addEventListener("open", openHandler)
    ws.addEventListener("error", errorHandler)
}

type EventType = 'messageReceived' | 'statusChanged'


export const chatAPI = {
    createWSChanel() {
        createWS()
    },
    subscribe(event: EventType, callback: any) {
        subscribers[event].push(callback)
        
        return () => {
            // @ts-ignore
            subscribers[event] = subscribers[event].filter((sub: any) => sub !== callback)
        }
    },
    unsubscribe(event: EventType, callback: MessagesReceivedSubscriber | StatusChangedSubscriber) {
        // @ts-ignore
        subscribers[event] = subscribers[event].filter((sub: Function) => sub !== callback)
    },
    sendMessage(message: string) {
        ws.send(message)
    },
    stop() {
        cleanUp()
        subscribers = {
            'messageReceived': [],
            'statusChanged': []
        }
    }
}

