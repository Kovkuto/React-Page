import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { reduxForm } from "redux-form";
import { login } from "../../redux/authReducer";
import { minLength, requiredField } from "../../utils/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import classes from "./Login.module.css"

const Login = ({ isAuth, login }) => {
    const onSubmit = formData => {
        login(formData.email, formData.password, formData.remeberMe)
    }
    if (isAuth) return <Navigate to="../profile/me" />
    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const minLenght8 = minLength(8)

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("email", Input, { type: "email", placeholder: "Email" }, [requiredField])}
            {createField("password", Input, { type: "password", placeholder: "Password" }, [requiredField, minLenght8])}
            {createField("rememberMe", Input, { type: "checkbox" }, null, "remember me")}

            {error
                ? <div className={classes.formError}>{error}</div>
                : ""
            }

            <button type="submit" >Ok</button>

        </form>
    )
}

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm)

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)
