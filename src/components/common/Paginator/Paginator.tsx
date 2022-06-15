import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import classes from "./Paginator.module.css"

export type PaginatorPropsType = {
    totalCount: number,
    pageSize: number,
    currentPage: number,
    setCurrentPage: (page: number) => void
}

const Paginator: React.FC<PaginatorPropsType> = ({totalCount, pageSize, currentPage, setCurrentPage}) => {
    let pagesCount: number = Math.ceil(totalCount / pageSize)
    let [totalPages, setTotalPages] = useState<number[]>([])
    useEffect(() => {
        let arr: number[] = []
        for (let i = 1; i <= pagesCount; i++){
            arr.push(i)
        }
        setTotalPages(arr)
    }, [pagesCount])
    let pages: any[] = []
    if (currentPage > 2) {
        pages = totalPages.slice(currentPage - 3, currentPage + 2)
        pages.unshift("<--")
    } else {
        pages = totalPages.slice(0, 3)
    }
    
    const pageClass = (pageNumber: number | string) => classNames({
        [classes.selected]: pageNumber === currentPage,
        [classes.unselected]: pageNumber !== currentPage
    })
    return (<span>
        {pages.map(pageNumber => <span
        key={pageNumber}
        className={pageClass(pageNumber)}
        onClick={() => setCurrentPage(pageNumber === "<--" ? 1 : pageNumber)}
        >
        {pageNumber}
    </span>)}
    </span>)
}

export default Paginator
