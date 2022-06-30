import React from "react";
import classes from "../Dialogs.module.css"

interface IProps {
    isMe: boolean
    ava: string
    text: string
}

function DialogMessageItem(props: IProps) {
    return (
        <div className={`${classes.dialogs__message} ${props.isMe ? classes.me : classes.companion}`}>
            <img src={props.ava} />
            <div className={classes.message}>{props.text}</div>
        </div>
    )
}



export default DialogMessageItem