import { reduxForm } from "redux-form"
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls"
import {requiredField} from "../../../utils/validators"
import { Contact } from "./ProfileDescription"
import classes from "./ProfileDescription.module.css"

const ProfileDataForm = ({ handleSubmit, currentProfile, error }) => {
    let contacts = Object.keys(currentProfile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={createField(`contacts.${key}`, Input, {placeholder: "Link"})} />
    })

    return (
        <form method="post" onSubmit={handleSubmit} className={classes.form_control}>
            {createField("fullName", Input, {placeholder: "Full Name"}, [requiredField], "Full Name:")}
            {createField("aboutMe", Input, {placeholder: "About Me"}, null, "About Me:")}
            {createField("lookingForAJob", Input, {placeholder: "Looking For A Job", type: "checkbox"}, null, "Looking For A Job:")}
            {createField("lookingForAJobDescription", Textarea, {placeholder: "My Skills"}, null, "My Skills:")}
            {contacts}
            <button type="submit">Save</button>
        </form>
    )
}

export default reduxForm({
    form: "profile"
})(ProfileDataForm)