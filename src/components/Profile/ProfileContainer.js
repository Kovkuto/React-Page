import React, { useEffect } from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getProfile, getStatus, setPhoto, updateStatus, setProfile } from "../../redux/profileReducer";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import Preloader from "../common/Preloader/Preloader";
import { WithRouter } from "../../hoc/withRouter";
import { useParams } from "react-router-dom";


const ProfileContainer = (props) => {
    let id = useParams().id
    if (props.id) id = props.id

    useEffect(() => {
        props.getProfile(id)
        props.getStatus(id) 
    }, [id])
    return (
        <>
            {!props.isFetching
            ? <Profile {...props} />
            : <Preloader />}
        </>
    )
}

const mapStateToProps = (state) => ({
    currentProfile: state.profilePage.currentProfile,
    status: state.profilePage.status,
    isFetching: state.profilePage.isFetching
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        getProfile,
        getStatus,
        updateStatus,
        setPhoto,
        setProfile
    }),
    WithRouter
)(ProfileContainer)
