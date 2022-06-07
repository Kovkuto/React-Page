import './App.css';
import Navbar from "../Navbar/Navbar";
import News from "../News/News";
import Settings from "../Settings/Settings";
import { Routes, Route } from 'react-router-dom';
import Users from "../Users/Users";
import HeaderContainer from '../Header/HeaderContainer';
import Login from '../Login/Login';
import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { initialzeApp } from '../../redux/appReducer';
import Preloader from '../common/Preloader/Preloader';
import { WithRouter } from '../../hoc/withRouter';
import { compose } from 'redux';
import withFuse from '../../hoc/withFuse';
import { BrowserRouter } from "react-router-dom"
import store from "../../redux/redux-store"
import { Provider } from "react-redux";

const ProfileContainer = lazy(() => import('../Profile/ProfileContainer'))
const DialogsContainer = lazy(() => import("../Dialogs/DialogsContainer"))

class App extends React.Component {
    componentDidMount() {
        this.props.initialzeApp()
    }
    render() {
        if (!this.props.initialized) return <Preloader />
        return (
            <div className="app-wrapper">
                <HeaderContainer />
                <Navbar />
                <div className="app_wrapper__content">
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <Routes>
                            <Route path="/profile/me" element={<ProfileContainer id={this.props.id} />} />
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
}


const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    id: state.auth.userId
})


const AppContainer = compose(
    connect(mapStateToProps, { initialzeApp }),
    WithRouter,
    withFuse
)(App);


const MainApp = (props) => {
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