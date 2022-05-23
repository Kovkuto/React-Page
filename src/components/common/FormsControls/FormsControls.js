import React from "react"
import classes from "./FormsControls.module.css"

export const Textarea = ({ input, meta, ...props }) => {

    const hasError = meta.error && meta.touched

    return (
        <div className={classes.formControl}>
            <div>
                <textarea {...input} {...props} className={hasError ? `${classes.error}` : ""}/>
            </div>
            {hasError && <span className={classes.error__span}>{meta.error}</span>}
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
