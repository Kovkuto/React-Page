import React from "react"
import { connect, ConnectedProps } from "react-redux"
import { Navigate } from "react-router-dom"
import { StateType } from "../redux/redux-store"

const withAuthRedirect = (Component: Function) => {
    const RedirectComponent = <T extends ConnectedProps<typeof connector>>(props: T) => {
        if (!props.isAuth) return <Navigate to={"/login"}/>

        return <Component {...props} />
    }
    const mapStateToProps = (state: StateType) => ({
        isAuth: state.auth.isAuth
    })
    const connector = connect(mapStateToProps)
    return connector(RedirectComponent)
}

export default withAuthRedirect