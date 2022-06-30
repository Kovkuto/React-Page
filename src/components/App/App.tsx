import { TitleType } from '../../redux/sidebarReducer';
import './App.css';
import Navbar from "../Navbar/Navbar";
import News from "../News/News";
import Settings from "../Settings/Settings";
import { Routes, Route, BrowserRouter, Navigate, NavLink } from 'react-router-dom';
import Users from "../Users/Users";
import Header from '../Header/Header';
import Login from '../Login/Login';
import { lazy, Suspense, useEffect } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { initialzeApp } from '../../redux/appReducer';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import withFuse from '../../hoc/withFuse';
import store, { StateType } from "../../redux/redux-store"
import { Provider } from "react-redux";
import React from "react"
import 'antd/dist/antd.min.css'
import { Breadcrumb, Layout, Menu } from 'antd';
const ProfileContainer = lazy(() => import('../Profile/ProfileContainer'))
const Dialogs = lazy(() => import("../Dialogs/Dialogs"))
const ChatPage = lazy(() => import("../../pages/Chat/ChatPage").then(({ChatPage}) => ({default: ChatPage})))

type Props = ConnectedProps<typeof connector>
const { Content, Footer, Sider } = Layout;

{/* <img style={{width: "50px", borderRadius: "3px"}} src='https://static.vecteezy.com/system/resources/previews/002/412/377/original/coffee-cup-logo-coffee-shop-icon-design-free-vector.jpg'/> */}

const App: React.FC<Props> = ({ initialzeApp, initialized }) => {    
    // -----------------------------WorkSpace----------------------------- \\
    const titles = useSelector((state: StateType) => state.sidebarPage.titles)
    // const avatart = useSelector((state: StateType) => state)
    
    const id = useSelector((state: StateType) => state.auth.userId)
    useEffect(() => {
        initialzeApp()
    }, [])

    // ----------------------------------JSX---------------------------------- \\
    if (!initialized) return <Preloader />
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header />
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            {titles.map((value: TitleType) => <Menu.Item key={value.id}><NavLink to={value.url}>{value.text}</NavLink></Menu.Item>)}
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Suspense fallback={<h1>Loading...</h1>}>
                            <Routes>
                                <Route path='*' element={<div>Error 404</div>} />
                                <Route path='/' element={<Navigate to="/profile/me" />} />
                                <Route path="/profile/me" element={<ProfileContainer id={id} />} />
                                <Route path="/profile/:id" element={<ProfileContainer />} />
                                <Route path="/dialogs/*" element={<Dialogs />} />
                                <Route path="/news" element={<News />} />
                                <Route path="/find-users" element={<Users />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/chat" element={<ChatPage />} />
                            </Routes>
                        </Suspense>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Kovkuto Production ©2022 Created by Kovkuto</Footer>
        </Layout>
    )
}

const mapStateToProps = (state: StateType) => ({
    initialized: state.app.initialized,
})

const connector = connect(mapStateToProps, { initialzeApp })

const AppContainer: any = compose(
    connector,
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
