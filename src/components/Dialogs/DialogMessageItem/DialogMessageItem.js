import React from "react";
import classes from "../Dialogs.module.css"

//class={`${classes.dialogs__message} ${props.isMe ? classes.me : classes.companion}`}

function DialogMessageItem(props) {
    return (
        <div className={`${classes.dialogs__message} ${props.isMe ? classes.me : classes.companion}`}>
            <img src={props.ava} />
            <div className={classes.message}>{props.text}</div>
        </div>
    )
}



export default DialogMessageItem