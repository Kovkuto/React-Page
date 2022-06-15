import { UserType } from '../../redux/usersReducer/usersReducer';
import React, { useEffect } from "react";
import User from "./User/User"
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { followUnfollowFlow, setCurrentPage, getUsers } from "../../redux/usersReducer";
import { getCurrentPage, getFollowInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersData } from "../../redux/selectors/usersSelectors";
import { connect } from "react-redux";
import Paginator, { PaginatorPropsType } from "../common/Paginator/Paginator";
import { StateType } from '../../redux/redux-store';

type MapStateToProps = {
    followInProgress: number[],
    usersData: UserType[],
    isFetching: boolean
}

type MapDispatchToProps = {
    getUsers: (currentPage: number, pageSize: number) => void,
    followUnfollowFlow: (id: number, followed: boolean) => void,
    setCurrentPage: (page: number) => void
}

type Props = MapStateToProps & MapDispatchToProps & PaginatorPropsType

const Users: React.FC<Props> = ({ getUsers, usersData, followInProgress, followUnfollowFlow,
     totalCount, pageSize, currentPage, setCurrentPage, isFetching}) => {
    useEffect(() => {
        getUsers(currentPage, pageSize)
    }, [currentPage])

    let usersItems = usersData.map(user => {
        return <User
            key={user.id}
            followInProgress={followInProgress}
            followUnfollowFlow={followUnfollowFlow}
            {...user}
        />
    })
    return (
        <div>
            <Paginator pageSize={pageSize} currentPage={currentPage} setCurrentPage={setCurrentPage} totalCount={totalCount}/>
            {isFetching ? <Preloader /> : null}
            {usersItems}
        </div>
    )
}


let mapStateToProps = (state: StateType) => ({
    usersData: getUsersData(state),
    pageSize: getPageSize(state),
    totalCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followInProgress: getFollowInProgress(state)
})

export default compose(
    connect<MapStateToProps, MapDispatchToProps, {}, StateType>(mapStateToProps,
        {
            followUnfollowFlow,
            setCurrentPage,
            getUsers
        }
    )
)(Users)
