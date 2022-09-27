import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {changePassword} from "../http/userAPI";
import {CHANGE_PASSWORD_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import Row from "react-bootstrap/Row";


const ChangePassword = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [new_password, setNewPassword] = useState('')
    const {user} = useContext(Context)
    const history = useHistory()

    const func_change_password = async () => {
        let data;
        try {
            data = await changePassword(login, password, new_password);
            history.push(LOGIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>

            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Password Change</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Input login"
                        value={login}
                        onChange={e => setLogin(e.target.value)}/>
                    <Form.Control
                        className="mt-3"
                        placeholder="Input old password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                    <Form.Control
                        className="mt-3"
                        placeholder="Input new password..."
                        value={new_password}
                        onChange={e => setNewPassword(e.target.value)}/>
                </Form>
                <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                    <Button
                        className = "align-self-end"
                        variant={"outline-success"}
                        onClick={func_change_password}>
                        Подтвердить
                    </Button>
                </Row>
            </Card>
        </Container>
    );
};

export default ChangePassword;