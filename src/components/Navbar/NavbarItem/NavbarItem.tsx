import React from "react";
import classes from '../Navbar.module.css'
import { NavLink } from "react-router-dom";

interface IProps {
    url: string
    text: string
}

function NavbarItem(props: IProps) {
    return (
        <div>
            <NavLink to={props.url} className={({ isActive }) => (`${isActive ? classes.active : classes.item}`)}>
                {props.text}
            </NavLink>
        </div>
    )
}



export default NavbarItem
