import classes from "./Dialogs.module.css"
import DialogUserItem from "./DialogUserItem/DialogUserItem"
import DialogMessageItem from "./DialogMessageItem/DialogMessageItem"
import { NavLink } from "react-router-dom";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";


function Dialogs(props) {
    let dialogsUserElements = props.state.dialogsUsersData.map(user => { return <DialogUserItem key={user.id} user_id={user.id} user_name={user.name} /> })
    dialogsUserElements.unshift(<NavLink key={0} to="/dialogs/" className={({isActive}) => {return (isActive ? `${classes.dialogs__user} ${classes.active}` : `${classes.dialogs__user}`)}}>------------</NavLink>)
    let dialogsMessagesElements = props.state.dialogsMessagesData.map(message => { return <DialogMessageItem key={message.id} id={message.id} isMe={message.isMe} text={message.text} ava={message.ava} /> })

    const onSubmit = (formData) => {
        props.sendMessage(formData.messageText, true)
        console.log(formData);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs__users}>
                <h2>Dialogs:</h2>
                <ul>
                    {dialogsUserElements}
                </ul>
            </div>
            <div className={classes.dialogs__messages}>
                {dialogsMessagesElements}
                <MessageReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export const MessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name="messageText" component={"textarea"} placeholder="Message"/>
            <button type="submit">Send</button>
        </form>
    )
}

const MessageReduxForm = reduxForm({
    form: "dialogs"
})(MessageForm)

export default Dialogs
