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
    const finalProps = {
        ...input,
        ...props
    }
    const hasError = meta.error && meta.touched

    return (
        <div className={`${classes.formControl} ${hasError ? classes.error: ""}`}>
            <div>
                {React.createElement(element, {...finalProps})}
            </div>
            {hasError && <span className={classes.error}>{meta.error}</span>}
        </div>
    )
}
