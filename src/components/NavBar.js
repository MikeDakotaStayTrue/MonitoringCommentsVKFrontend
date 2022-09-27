import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {PROFILE_ROUTE, LOGIN_ROUTE, BOARD_ROUTE,
CHANGE_PASSWORD_ROUTE,REGISTRATION_ROUTE, MAIL_CONFIRM_ROUTE, LIST_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
import {logout} from "../http/userAPI";


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = async () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setEmail({})

        let refreshToken = localStorage.getItem('refreshToken');

        let data = await logout(refreshToken)
        history.push(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={LOGIN_ROUTE}><h2>Propolis</h2></NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LIST_ROUTE)} className="ml-2">Lists</Button>
                        <Button variant={"outline-light"} onClick={() => history.push(BOARD_ROUTE)} className="ml-2">Board</Button>
                        <Button variant={"outline-light"} onClick={() => history.push(PROFILE_ROUTE)} className="ml-2">Profile</Button>
                        <Button variant={"outline-light"} onClick={() => logOut()} className="ml-2">Logout </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)} className="ml-2">Login</Button>
                        <Button variant={"outline-light"} onClick={() => history.push(CHANGE_PASSWORD_ROUTE)} className="ml-2">Change Password</Button>
                        <Button variant={"outline-light"} onClick={() => history.push(REGISTRATION_ROUTE)} className="ml-2">Register</Button>
                        <Button variant={"outline-light"} onClick={() => history.push(MAIL_CONFIRM_ROUTE)} className="ml-2">Confirm mail</Button>
                    </Nav>

                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
