import React from "react";
import classes from "../Navbar.module.css"
import FriendItem from "./FriendItem/FriendItem";


function NavbarFriends(props) {
    let friendsItems = props.state.map(value => {return <FriendItem key={value.id} id={value.id} name={value.name} ava={value.ava}/>})
    return (
        <div className={classes.friedends}>
            <h2>Friends:</h2>
            <div className={classes.friendsItems}>{friendsItems}</div>
        </div>
    )
}


export default NavbarFriends
