import React from "react";
import classes from './Profile.module.css'
import ProfileDescription from "./ProfileDescription/ProfileDescription";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


function Profile(props){
    return (
        <div className={classes.main_content}>
            <ProfileDescription setPhoto={props.setPhoto} currentProfile={props.currentProfile} status={props.status} updateStatus={props.updateStatus} id={props.id} setProfile={props.setProfile}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile
