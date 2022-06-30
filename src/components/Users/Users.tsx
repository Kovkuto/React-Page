import React, { useEffect, useState } from "react";
import User from "./User/User"
import Preloader from "../common/Preloader/Preloader";
import { followUnfollowFlow, getUsers, setCurrentPage } from "../../redux/usersReducer";
import { getCurrentPage, getFollowInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersData, getUsersFilter } from "../../redux/selectors/usersSelectors";
import { useDispatch, useSelector } from "react-redux";
import Paginator from "../common/Paginator/Paginator";
import UsersSearchForm from './UsersSearchForm';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { hasValueObjQ } from '../../api/api';

// ---------------------------Component--------------------------- \\
const Users: React.FC = React.memo(() => {

    // --------------------------Selctors-------------------------- \\
    const totalCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const usersData = useSelector(getUsersData)
    const isFetching = useSelector(getIsFetching)
    const followInProgress = useSelector(getFollowInProgress)
    const filter = useSelector(getUsersFilter)
    const currentPage = useSelector(getCurrentPage)

    const dispatch = useDispatch()
    // -----------------------ExtraWork----------------------- \\

    const [query, setQuery] = useSearchParams()

    const friend = query.get("friend") === "true" ? true : query.get("friend") === "false" ? false : null  
    const parsedFilter = {
        term: query.get("term") as string, 
        friend: friend
    }

    useEffect(() => {
        setQuery(hasValueObjQ({page: currentPage, ...filter}))
        dispatch(getUsers(currentPage ? currentPage : 1, pageSize, parsedFilter))
    }, [currentPage, pageSize])

    useEffect(() => {
        setQuery(hasValueObjQ({page: query.get("page"), ...parsedFilter}))
        dispatch(setCurrentPage(isNaN(Number(query.get("page"))) ? currentPage ? currentPage : 1 : Number(query.get("page"))))
    }, [])

    let usersItems = usersData.map(user => {
        return <User
            key={user.id}
            followInProgress={followInProgress}
            followUnfollowFlow={(id: number, followed: boolean) => dispatch(followUnfollowFlow(id, followed))}
            {...user}
        />
    })

    // ----------------------------JSX---------------------------- \\
    return (
        <div>
            <Paginator pageSize={pageSize} currentPage={currentPage} setCurrentPage={(pageNumber: number) => dispatch(setCurrentPage(pageNumber))} totalCount={totalCount} />
            {isFetching ? <Preloader /> : null}
            <div style={{ textAlign: "center" }}><UsersSearchForm /></div>
            <div style={{ alignItems: "center" }}>{usersItems}</div>
        </div>
    )
})

export default Users
