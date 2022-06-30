import React from "react"
import { Field, WrappedFieldProps } from "redux-form"
import { FieldValidator } from "../../../utils/validators"
import classes from "./FormsControls.module.css"

type FieldComponent = ({input, meta, ...props}: WrappedFieldProps) => JSX.Element

const FormsControl = ({input, meta: {touched, error}, children, ...props}: WrappedFieldProps & {children: JSX.Element | string}) => {
    
    const hasError = error && touched
    
    return (
        <div className={classes.formControl}>
            <div>
                {children}
            </div>
            {hasError && <span className={classes.error__span}>{error}</span>}
        </div>
    )
}

export const Textarea = (props: WrappedFieldProps) => {
    const {input, ...restProps} = props
    return <FormsControl {...props}><textarea {...input} {...restProps}></textarea></FormsControl>
}

export const Input = (props: WrappedFieldProps) => {
    const {input, ...restProps} = props
    return <FormsControl {...props}><input {...input} {...restProps}></input></FormsControl>
}

export const createField = <T extends unknown>(name: Extract<keyof T, string>, component: React.ComponentClass | React.FC | string | FieldComponent, props={} as {[key: string]: string} | null , validators=[] as FieldValidator[] | null, children: any) => <div>
    {children}
    <Field name={name} component={component} validate={validators} {...props}/>
</div>
