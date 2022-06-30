import React from "react";
import classes from './Profile.module.css'
import ProfileDescription from "./ProfileDescription/ProfileDescription";
import MyPost from "./MyPosts/MyPost";

type OwnProps = {
    myId: number | undefined
}

const Profile: React.FC<OwnProps> = (props) => { 
    return (
        <div className={classes.main_content}>
            <ProfileDescription id={props.myId}/>
            <MyPost />
        </div>
    )
}


export default Profile
