import React from "react";
import classes from "../Dialogs.module.css"
import { NavLink } from "react-router-dom"


function DialogUserItem(props) {
    return (
        <li>
            <NavLink to={`/dialogs/${props.user_id}`} className={({isActive}) => {return (isActive ? `${classes.dialogs__user} ${classes.active}` : `${classes.dialogs__user}`)}}>
                {props.user_name}
            </NavLink>
        </li>
    )
}


export default DialogUserItem