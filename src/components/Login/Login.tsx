import React from "react";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { InjectedFormProps, reduxForm } from "redux-form";
import { login } from "../../redux/authReducer";
import { StateType } from "../../redux/redux-store";
import { minLength, requiredField } from "../../utils/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import classes from "./Login.module.css"

interface IForm {
    password: string
    email: string
    rememberMe: boolean
    captcha: string | null
}

const Login: React.FC = () => {
    const isAuth = useSelector((state: StateType) => state.auth.isAuth)
    const dispatch = useDispatch()
    
    const onSubmit = (formData: IForm) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) return <Navigate to="../profile/me" />
    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const minLenght8 = minLength(8)

const LoginForm: React.FC<InjectedFormProps<IForm>> = ({ handleSubmit, error}) => {
    // -----------------Selectors-------------- \\
    const captchaUrl = useSelector((state: StateType) => state.auth.captchaUrl)
    
    return (
        <form onSubmit={handleSubmit}>
            {createField<IForm>("email", Input, { type: "email", placeholder: "Email" }, [requiredField], null)}
            {createField<IForm>("password", Input, { type: "password", placeholder: "Password" }, [requiredField, minLenght8], null)}
            {createField<IForm>("rememberMe", Input, { type: "checkbox" }, null, "remember me")}

            {error && <div className={classes.formError}>{error}</div>}
            {captchaUrl && <>
                <img src={captchaUrl} />
                {createField<IForm>("captcha", Input, null, [requiredField], null)}
            </>}
            <button type="submit" >Ok</button>

        </form>
    )
}

const LoginReduxForm = reduxForm<IForm>({ form: "login" })(LoginForm)

export default Login
