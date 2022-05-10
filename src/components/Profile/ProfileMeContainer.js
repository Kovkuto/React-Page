import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getMyProfile, getStatus, updateStatus } from "../../redux/profileReducer";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import Preloader from "../common/Preloader/Preloader";


class ProfileMeContainer extends React.Component {
    componentDidMount() {
        this.props.getMyProfile(this.props)
        this.props.getStatus(this.props.id)
    }
    render() {
        return (
            <>
                {!this.props.isFetching
                    ? <Profile {...this.props} />
                    : <Preloader />}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentProfile: state.profilePage.currentProfile,
    id: state.auth.userId,
    status: state.profilePage.status,
    isFetching: state.profilePage.isFetching
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        getMyProfile,
        getStatus,
        updateStatus
    })
)(ProfileMeContainer)
