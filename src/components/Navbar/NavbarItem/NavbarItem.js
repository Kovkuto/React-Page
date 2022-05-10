import React from "react";
import classes from '../Navbar.module.css'
import { NavLink } from "react-router-dom";


function NavbarItem(props) {
    return (
        <div>
            <NavLink to={props.url} className={({ isActive }) => (`${isActive ? classes.active : classes.item}`)}>
                {props.text}
            </NavLink>
        </div>
    )
}



export default NavbarItem
