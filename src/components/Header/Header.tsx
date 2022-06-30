import { Avatar, Button, Col, Layout, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../redux/authReducer";
import { getIsAuth, getLogin } from "../../redux/selectors/authSelectors";

const { Header } = Layout

const AppHeader: React.FC = () => {
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLogin)
    const dispatch = useDispatch()

    return (
        <Header className="header">
            <div className="logo" />
            <Row>
                <Col span={23}>
                    {isAuth && <div style={{color: "white"}}>
                            <Avatar />
                            {login}
                        </div>
                    }
                </Col>
                <Col span={1}>
                    {isAuth 
                    ? <Button type={'link'} onClick={() => dispatch(logout())}>Logout</Button>
                    : <Link to="/login">Login</Link>
                }
                </Col>
            </Row>
        </Header>
    )
}

// const mapStateToProps = (state: StateType) => ({
//     isAuth: state.auth.isAuth,
//     login: state.auth.login
// })

export default AppHeader
