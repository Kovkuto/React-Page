import { Avatar, Button } from 'antd'
import React, { UIEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessage, sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chatReducer'
import { StateType } from '../../redux/redux-store'


export const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {
    const status = useSelector((state: StateType) => state.chatPage.status)
    const dispatch = useDispatch()


    useEffect(() => {
        console.log("Ok");

        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === 'error' ? <div>Something went wrong. Please refresh page</div> :
                <>
                    <Messages />
                    <MessagesForm />
                </>}
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = useSelector((state: StateType) => state.chatPage.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    useEffect(() => {
        if (isAutoScroll) messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget
        if (el.scrollHeight - el.scrollTop === el.clientHeight) {
            if (!isAutoScroll) setIsAutoScroll(true)
        } else {
            if (isAutoScroll) setIsAutoScroll(false)
        }
    }

    return (
        <div style={{ height: "400px", overflowY: "auto", backgroundColor: "white", borderRadius: "3px" }} onScroll={scrollHandler}>
            {messages.map((message: ChatMessage) => <Message key={message.messageId} {...message} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: React.FC<ChatMessage> = React.memo(({ userName, message, photo }) => {
    return (
        <div style={{ padding: "3px" }}>
            <Avatar src={photo || "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"} alt="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png" size={'large'} /> <b>{userName}</b>
            <br />
            {message}
            <hr />
        </div>
    )
})

const MessagesForm: React.FC = () => {
    const [message, setMessage] = useState("")
    const status = useSelector((state: StateType) => state.chatPage.status)
    const dispatch = useDispatch()


    const sendOnClick = () => {
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => {
                    setMessage(e.target.value)
                }} value={message}></textarea>
            </div>
            <div>
                <Button onClick={sendOnClick} disabled={status !== 'ready'} >Send</Button>
            </div>
        </div>
    )
}
