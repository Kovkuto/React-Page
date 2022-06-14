import React, { useEffect } from "react";
import User from "./User/User"
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { followUnfollowFlow, setFollowInProgress, setCurrentPage, getUsers} from "../../redux/usersReducer";
import { getCurrentPage, getFollowInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersData } from "../../redux/selectors/usersSelectors";
import { connect } from "react-redux";
import Paginator from "../common/Paginator/Paginator";

const Users = (props) => {
    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize)
    }, [props.currentPage])

    let usersItems = props.usersData.map(user => {
        return <User
            key={user.id}
            followInProgress={props.followInProgress}
            follow={props.follow}
            unfollow={props.unfollow}
            setFollowInProgress={props.setFollowInProgress}
            followUnfollowFlow={props.followUnfollowFlow}
            {...user}
        />
    })
    return (
        <div>
            <Paginator pageSize={props.pageSize} currentPage={props.currentPage} setCurrentPage={props.setCurrentPage} totalCount={props.totalCount}/>
            {props.isFetching ? <Preloader /> : null}
            {usersItems}
        </div>
    )
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
            followUnfollowFlow,
            setCurrentPage,
            setFollowInProgress,
            getUsers
        }
    )
)(Users)
