import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getProfile, getStatus, setPhoto, updateStatus } from "../../redux/profileReducer";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import Preloader from "../common/Preloader/Preloader";
import { WithRouter } from "../../hoc/withRouter";


class ProfileContainer extends React.Component {
    componentDidMount() {
        const id = this.props.id ? this.props.id : RegExp("[0-9]+").exec(this.props.pathname)[0]
        this.props.getProfile(id)
        this.props.getStatus(id) 
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
        updateStatus,
        setPhoto
    }),
    WithRouter
)(ProfileContainer)
