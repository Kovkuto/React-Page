import React from "react";
import classes from './Profile.module.css'
import ProfileDescription from "./ProfileDescription/ProfileDescription";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


function Profile(props){
    return (
        <div className={classes.main_content}>
            <ProfileDescription currentProfile={props.currentProfile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile
