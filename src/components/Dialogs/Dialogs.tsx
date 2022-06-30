import classes from "./Dialogs.module.css"
import DialogUserItem from "./DialogUserItem/DialogUserItem"
import DialogMessageItem from "./DialogMessageItem/DialogMessageItem"
import { NavLink } from "react-router-dom";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Field } from "redux-form";
import { compose } from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { connect, ConnectedProps } from "react-redux";
import {sendMessage} from "../../redux/dialogsReducer";
import { StateType } from "../../redux/redux-store";
import { ComponentType } from "react";

type Props = ConnectedProps<typeof connector>

function Dialogs(props: Props) {
    let dialogsUserElements = props.state.dialogsUsersData.map(user => { return <DialogUserItem key={user.id} user_id={user.id} user_name={user.name} /> })
    dialogsUserElements.unshift(<NavLink key={0} to="/dialogs/" className={({isActive}) => {return (isActive ? `${classes.dialogs__user} ${classes.active}` : `${classes.dialogs__user}`)}}>------------</NavLink>)
    let dialogsMessagesElements = props.state.dialogsMessagesData.map(message => { return <DialogMessageItem key={message.id} isMe={message.isMe} text={message.text} ava={message.ava} /> })

    const onSubmit = (formData: IForm) => {
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

interface IForm {
    messageText: string
}

export const MessageForm: React.FC<InjectedFormProps<IForm>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name="messageText" component={"textarea"} placeholder="Message"/>
            <button type="submit">Send</button>
        </form>
    )
}

const MessageReduxForm = reduxForm<IForm>({
    form: "dialogs"
})(MessageForm)

let mapStateToProps = (state: StateType) => {
    return {
        state: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

const connector = connect(mapStateToProps, {
    sendMessage
})

export default compose(
    withAuthRedirect,
    connector
)(Dialogs) as ComponentType<any>
