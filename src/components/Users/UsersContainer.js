import { connect } from "react-redux";
import { follow, unfollow, setFollowInProgress, setCurrentPage, getUsers} from "../../redux/usersReducer";
import Users from "./Users";
import React from "react";
import { compose } from "redux";

class UsersContainer extends React.Component {
    componentDidMount = () => {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    render() {
        return <Users {...this.props}/>
    }
}


let mapStateToProps = (state) => ({
    usersData: state.usersPage.usersData,
    pageSize: state.usersPage.pageSize,
    totalCount: state.usersPage.totalCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followInProgress: state.usersPage.followInProgress,
})

export default compose(
    connect(mapStateToProps,
        {
            follow,
            unfollow,
            setCurrentPage,
            setFollowInProgress,
            getUsers
        }
    )
)(UsersContainer)