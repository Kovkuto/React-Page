import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getProfile, getStatus, updateStatus } from "../../redux/profileReducer";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import Preloader from "../common/Preloader/Preloader";
import { WithRouter } from "../../hoc/withRouter";


class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getProfile(RegExp("[0-9]+").exec(this.props.pathname)[0])
        this.props.getStatus(RegExp("[0-9]+").exec(this.props.pathname)[0])
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
    status: state.profilePage.status,
    isFetching: state.profilePage.isFetching
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        getProfile,
        getStatus,
        updateStatus
    }),
    WithRouter
)(ProfileContainer)
