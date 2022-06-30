import React, { ComponentType, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import Profile from "./Profile";
import { getProfile, getStatus } from "../../redux/profileReducer";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import Preloader from "../common/Preloader/Preloader";
import { useParams } from "react-router-dom";
import { StateType } from "../../redux/redux-store";

type OwnProps = {
    id: number | undefined
}

type Props = ConnectedProps<typeof connector> & OwnProps

const ProfileContainer: React.FC<Props> = (props) => {
    let id = Number(useParams().id)
    if (props.id) id = props.id
    
    useEffect(() => {
        props.getProfile(id)
        props.getStatus(id) 
    }, [id])
    return (
        <>
            {!props.isFetching
            ? <Profile myId={props.id} />
            : <Preloader />}
        </>
    )
}

const mapStateToProps = (state: StateType) => ({
    isFetching: state.profilePage.isFetching
})

const connector = connect(mapStateToProps, {
    getProfile,
    getStatus
})

export default compose(
    withAuthRedirect,
    connector,
)(ProfileContainer) as ComponentType<any>
