import React from "react";
import classes from "./Users.module.css"
import User from "./User/User"
import Preloader from "../common/Preloader/Preloader";


const Users = (props) => {
    let usersItems = props.usersData.map(user => {
        return <User
            key={user.id}
            followInProgress={props.followInProgress}
            follow={props.follow}
            unfollow={props.unfollow}
            setFollowInProgress={props.setFollowInProgress}
            {...user}
        />
    })
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)
    let totalPages = []
    for (let i = 1; i <= pagesCount; i++) {
        totalPages.push(i)
    }
    let pages = []
    if (props.currentPage > 3) {
        pages = totalPages.slice(props.currentPage - 2, props.currentPage + 2)
        pages.unshift("<--")
    } else {
        pages = totalPages.slice(0, props.currentPage + 2)
    }
    let pagesItems = pages.map(pageNumber => <span
        key={pageNumber}
        className={pageNumber === props.currentPage ? classes.selected : classes.unselected}
        onClick={() => {
            props.setCurrentPage(pageNumber === "<--" ? 1 : pageNumber)
            props.getUsers(pageNumber, props.pageSize)
        }}
    >
        {pageNumber}
    </span>)
    return (
        <div>
            {pagesItems}
            {props.isFetching ? <Preloader /> : null}
            {usersItems}
        </div>
    )
}



export default Users
