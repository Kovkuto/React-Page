import './App.css';
import Navbar from "../Navbar/Navbar";
import News from "../News/News";
import Settings from "../Settings/Settings";
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Users from "../Users/Users";
import HeaderContainer from '../Header/HeaderContainer';
import Login from '../Login/Login';
import { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { initialzeApp } from '../../redux/appReducer';
import Preloader from '../common/Preloader/Preloader';
import { WithRouter } from '../../hoc/withRouter';
import { compose } from 'redux';
import withFuse from '../../hoc/withFuse';
import store from "../../redux/redux-store.ts"
import { Provider } from "react-redux";
import * as React from "react"

const ProfileContainer = lazy(() => import('../Profile/ProfileContainer'))
const DialogsContainer = lazy(() => import("../Dialogs/DialogsContainer"))

const App = ({initialzeApp, initialized, id}) => {
    useEffect(() => {
        initialzeApp()
    }, [])
    if (!initialized) return <Preloader />
    return (
        <div className="app-wrapper">
            <HeaderContainer />
            <Navbar />
            <div className="app_wrapper__content">
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Routes>
                        <Route path='*' element={<div>Error 404</div>} />
                        <Route path='/' element={<Navigate to="/profile/me" />} />
                        <Route path="/profile/me" element={<ProfileContainer id={id} />} />
                        <Route path="/profile/:id" element={<ProfileContainer />} />
                        <Route path="/dialogs/*" element={<DialogsContainer />} />
                        <Route path="/news/" element={<News />} />
                        <Route path="/find-users/" element={<Users />} />
                        <Route path="/settings/" element={<Settings />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    id: state.auth.userId
})


const AppContainer = compose(
    connect(mapStateToProps, { initialzeApp }),
    WithRouter,
    withFuse
)(App)

const MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer state={store.getState()}
                    dispatch={store.dispatch.bind(store)} />
            </Provider>
        </BrowserRouter>
    )
}

export default MainApp
