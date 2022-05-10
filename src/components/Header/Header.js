import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/authReducer";
import classes from './Header.module.css'

function Header(props){
    return(
        <header className={classes.app_header}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtsgtB09P7v1mRO8FB6M1RDku6sVGUTeG2lPMa8vWCkYQCdO1LJpUgetVtbYngZFQBLN8&usqp=CAU"/>
            
            <div className={classes.loginBLock}>
                {props.isAuth 
                ? <div>
                        <div>{props.login}</div>
                        <button onClick={props.logout}>Logout</button>
                    </div>
                : <NavLink to="/login">Login</NavLink>
            }
            </div>
        </header>
    )
}

export default connect(null, {logout})(Header)
