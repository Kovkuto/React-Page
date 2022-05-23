import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import { Routes, Route } from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import ProfileMeContainer from './components/Profile/ProfileMeContainer';
import React from 'react';
import { connect } from 'react-redux';
import { initialzeApp } from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import { WithRouter } from './hoc/withRouter';
import { compose } from 'redux';
import withFuse from './hoc/withFuse';



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
                    <Routes>
                        <Route path="/profile/me" element={<ProfileMeContainer />} />
                        <Route path="/profile/:id" element={<ProfileContainer />} />
                        <Route path="/dialogs/*" element={<DialogsContainer />} />
                        <Route path="/news/" element={<News />} />
                        <Route path="/find-users/" element={<UsersContainer />} />
                        <Route path="/settings/" element={<Settings />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})


export default compose(
    connect(mapStateToProps, {initialzeApp}),
    WithRouter,
    withFuse
)(App);
