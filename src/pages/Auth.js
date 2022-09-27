import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, MAIL_CONFIRM_ROUTE, BOARD_ROUTE} from "../utils/consts";
import {login, registration, get_profile} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const func_auth = async () => {
        try {
            let data;
            if (isLogin) {

                data = await login(email, password)
                if (data === 1) {
                    history.push(MAIL_CONFIRM_ROUTE)
                } 
                else if (data === 2) {
                    history.push(REGISTRATION_ROUTE)
                } 
                else {
                    // Login success
                    user.setUser(user)
                    user.setIsAuth(true)
                    user.setEmail(email)

                    // Socket io?


                    history.push(BOARD_ROUTE)
                }
            }
            else {
                data = await registration(email, password)
                history.push(LOGIN_ROUTE)
            } 
            
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>

            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Login' : 'Register'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Input email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    <Form.Control
                        className="mt-3"
                        placeholder="Input password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"/>
                    <Button
                        variant={"outline-success"}
                        onClick={func_auth}>
                        {isLogin ? 'Login' : 'Register'}
                    </Button>
                    
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
