import { connect } from "react-redux";
import { follow, unfollow, setFollowInProgress, setCurrentPage, getUsers} from "../../redux/usersReducer";
import Users from "./Users";
import React from "react";
import { compose } from "redux";
import { getCurrentPage, getFollowInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersData } from "../../redux/selectors/usersSelectors";

class UsersContainer extends React.Component {
    componentDidMount = () => {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    render() {
        return <Users {...this.props}/>
    }
}

let mapStateToProps = (state) => ({
    usersData: getUsersData(state),
    pageSize: getPageSize(state),
    totalCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followInProgress: getFollowInProgress(state),
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