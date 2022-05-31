import React, { useEffect, useState } from 'react'
import classes from "./Paginator.module.css"

const Paginator = ({totalCount, pageSize, currentPage, setCurrentPage}) => {
    let pagesCount = Math.ceil(totalCount / pageSize)
    let [totalPages, setTotalPages] = useState([])
    useEffect(() => {
        let arr = []
        for (let i = 1; i <= pagesCount; i++){
            arr.push(i)
        }
        setTotalPages(arr)
    }, [pagesCount])
    let pages = []
    if (currentPage > 2) {
        pages = totalPages.slice(currentPage - 3, currentPage + 2)
        pages.unshift("<--")
    } else {
        pages = totalPages.slice(0, 3)
    }
    return pages.map(pageNumber => <span
        key={pageNumber}
        className={pageNumber === currentPage ? classes.selected : classes.unselected}
        onClick={() => setCurrentPage(pageNumber === "<--" ? 1 : pageNumber)}
        >
        {pageNumber}
    </span>)
}

export default Paginator
