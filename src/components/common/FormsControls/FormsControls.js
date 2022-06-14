import React from "react"
import { Field } from "redux-form"
import classes from "./FormsControls.module.css"

export const Textarea = ({ input, meta: {touched, error}, ...props }) => {

    const hasError = error && touched

    return (
        <div className={classes.formControl}>
            <div>
                <textarea {...input} {...props} className={hasError ? `${classes.error}` : ""}/>
            </div>
            {hasError && <span className={classes.error__span}>{error}</span>}
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {

    const hasError = meta.error && meta.touched

    return (
        <div className={classes.formControl}>
            <div>
                <input {...input} {...props} className={hasError ? classes.error: ""}/>
            </div>
            {hasError && <span className={classes.error__span}>{meta.error}</span>}
        </div>
    )
}

export const handleErrorOnElement = (element) => ({input, meta, ...props}) => {
    const El = element
    const hasError = meta.error && meta.touched

    return (
        <div className={classes.formControl}>
            <div>
                <El {...input} {...props} className={hasError ? classes.error: ""}/>
            </div>
            {hasError && <span className={classes.error__span}>{meta.error}</span>}
        </div>
    )
}

export const createField = (name, component, props={}, validators=[], children) => <div>
    {children}
    <Field name={name} component={component} validate={validators} {...props}/>
</div>
