import { IProfile } from '../../../redux/profileReducer';
import { reduxForm, InjectedFormProps } from "redux-form"
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls"
import {requiredField} from "../../../utils/validators"
import { Contact } from "./ProfileDescription"
import classes from "./ProfileDescription.module.css"
import React from 'react';

interface IProps {
    currentProfile: IProfile
}

const ProfileDataForm: React.FC<InjectedFormProps<IProfile, IProps> & IProps> = ({ handleSubmit, currentProfile, error }) => {
    let contacts = Object.keys(currentProfile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={createField(`contacts.${key}` as string, Input, {placeholder: "Link"}, null, null)} />
    })

    return (
        <form method="post" onSubmit={handleSubmit} className={classes.form_control}>
            {createField<IProfile>("fullName", Input, {placeholder: "Full Name"}, [requiredField], "Full Name:")}
            {createField<IProfile>("aboutMe", Input, {placeholder: "About Me"}, null, "About Me:")}
            {createField<IProfile>("lookingForAJob", Input, {placeholder: "Looking For A Job", type: "checkbox"}, null, "Looking For A Job:")}
            {createField<IProfile>("lookingForAJobDescription", Textarea, {placeholder: "My Skills"}, null, "My Skills:")}
            {contacts}
            <button type="submit">Save</button>
        </form>
    )
}

export default reduxForm<IProfile, IProps>({
    form: "profile"
})(ProfileDataForm)