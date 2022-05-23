import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { login } from "../../redux/authReducer";
import { minLength, requiredField } from "../../utils/validators";
import { handleErrorOnElement } from "../common/FormsControls/FormsControls";
import classes from "./Login.module.css"

const Login = (props) => {
    const onSubmit = formData => {
        props.login(formData.email, formData.password, formData.remeberMe)
    }
    if (props.isAuth) return <Navigate to="../profile/me" />
    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const minLenght8 = minLength(8)

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="email" component={handleErrorOnElement("input")} placeholder={"Email"} validate={requiredField} type="email"/>
            </div>
            <div>
                <Field name="password" component={handleErrorOnElement("input")} placeholder={"Password"} validate={[minLenght8, requiredField]} type="password"/>
            </div>
            <div>
                <Field name="rememberMe" component={handleErrorOnElement("input")} type={"checkbox"} /> remember me
            </div>
                {props.error 
                    ? <div className={classes.formError}>{props.error}</div>
                    : ""
                }
            <div>
                <button type="submit" >Ok</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: "login"})(LoginForm)

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)
