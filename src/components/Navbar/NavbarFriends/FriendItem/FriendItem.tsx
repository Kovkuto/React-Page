import React from "react";
import { NavLink } from "react-router-dom";
import classes from "../../Navbar.module.css"

interface IProps {
    id: number
    ava: string
    name: string
}

function friendItem(props: IProps){
    return (
        <div className={classes.friendItem}>
            <img src={props.ava} />
            <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
        </div>
    )
}



export default friendItem