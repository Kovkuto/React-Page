import React, { useState } from "react"
import Preloader from "../../common/Preloader/Preloader"
import classes from "./ProfileDescription.module.css"
import ProfileStatus from "../ProfileStatus";
import ProfileDataForm from "./ProfileDataForm";

function ProfileDescription({ currentProfile, setPhoto, id, status, updateStatus, setProfile }) {
    const [editMode, setEditMode] = useState(false)

    if (!currentProfile.userId) {
        return <Preloader />
    }
    let photo = currentProfile.photos.large
    if (photo) {
        photo = currentProfile.photos.large
    } else {
        photo = "https://media.istockphoto.com/photos/very-closeup-view-of-amazing-domestic-pet-in-mirror-round-fashion-is-picture-id1281804798?k=20&m=1281804798&s=612x612&w=0&h=gN9-n0NVMyyQ0GYYoEqPSPCXVZwkCZbRummxgqhxOIU="
    }

    const onSetPhotoSelected = (e) => {
        if (e.target.files.length) {
            setPhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        setProfile(formData);
        setEditMode(false)
    }

    let contacts = Object.keys(currentProfile.contacts).filter(key => currentProfile.contacts[key] ? key : null).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={currentProfile.contacts[key]} />
    })

    return (
        <div className={classes.all_descritption}>
            <div className={classes.avatar}>
                <img src={photo} />
            </div>
            {editMode ? <ProfileDataForm currentProfile={currentProfile} initialValues={currentProfile} onSubmit={onSubmit}/> :
                <div className={classes.description}>
                    <ul>
                        <li>Full Name: {currentProfile.fullName}</li>
                        <li>About Me: {currentProfile.aboutMe}</li>
                        <li>Looking for a job: {currentProfile.lookingForAJob ? "Yes" : "No"}</li>
                        <li>Skills: {currentProfile.lookingForAJobDescription}</li>
                        <li>Contacts: <div>{contacts.length === 0 ? "Missing" : contacts}</div></li>
                        <li>Status: <ProfileStatus status={status} updateStatus={updateStatus} /></li>
                    </ul>
                </div>
            }
            {id && <button onClick={() => setEditMode(!editMode)}>Edit</button>}
            {id && <input type="file" onChange={onSetPhotoSelected} />}
        </div>
    )
}

export const Contact = ({ contactTitle, contactValue }) => {
    return <div>{contactTitle}: {contactValue}</div>
}

export default ProfileDescription