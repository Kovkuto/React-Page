import React from "react";
import classes from './Navbar.module.css'
import NavbarItem from "./NavbarItem/NavbarItem.js";
import NavbarFriends from "./NavbarFriends/NavbarFriends";
import { connect } from "react-redux";


function Navbar(props){
    let navbarItems = props.state.titles.map(value => {return <NavbarItem key={value.id} url={value.url} text={value.text}/>})
    return(
        <nav className={classes.app_nav}>
            {navbarItems}
            <NavbarFriends state={props.state.friends}/>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    state: state.sidebarPage
})

export default connect(mapStateToProps)(Navbar)
