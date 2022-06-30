import React from "react";
import classes from './Navbar.module.css'
import NavbarItem from "./NavbarItem/NavbarItem";
import NavbarFriends from "./NavbarFriends/NavbarFriends";
import { connect, ConnectedProps } from "react-redux";
import { StateType } from "../../redux/redux-store";

type Props = ConnectedProps<typeof connector>

function Navbar(props: Props){
    let navbarItems = props.state.titles.map(value => {return <NavbarItem key={value.id} url={value.url} text={value.text}/>})
    return(
        <nav className={classes.app_nav}>
            {navbarItems}
            <NavbarFriends state={props.state.friends}/>
        </nav>
    )
}

const mapStateToProps = (state: StateType) => ({
    state: state.sidebarPage
})

const connector = connect(mapStateToProps)

export default connector(Navbar)
