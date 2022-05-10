import React from "react"
import Preloader from "../../common/Preloader/Preloader"
import classes from "./ProfileDescription.module.css"
import ProfileStatus from "../ProfileStatus/ProfileStatus";



function ProfileDescription(props) {
    if (!props.currentProfile.userId) {
        return <Preloader />
    }
    let photo = props.currentProfile.photos.large
    if(photo){
        photo = props.currentProfile.photos.large
    } else {
        photo = "https://media.istockphoto.com/photos/very-closeup-view-of-amazing-domestic-pet-in-mirror-round-fashion-is-picture-id1281804798?k=20&m=1281804798&s=612x612&w=0&h=gN9-n0NVMyyQ0GYYoEqPSPCXVZwkCZbRummxgqhxOIU="
    }

    return (
        <div className={classes.all_descritption}>
                <div className={classes.avatar}>
                    <img src={photo} />
                </div>
                <div className={classes.description}>
                    <ul>
                        <li>{props.currentProfile.fullName}</li>
                        <li>{props.currentProfile.aboutMe}</li>
                        <li>Status: <ProfileStatus status={props.status} updateStatus={props.updateStatus}/></li>
                    </ul>
                </div>
            </div>
    )
}


export default ProfileDescription