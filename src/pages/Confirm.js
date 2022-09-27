import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {confirm} from "../http/userAPI";
import {LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import Row from "react-bootstrap/Row";


const Confirm = () => {
    const [code, setCode] = useState('')
    const [email, setEmail] = useState('')
    const {user} = useContext(Context)
    const history = useHistory()

    const func_confirm = async () => {
        let data;
        try {
            data = await confirm(email, code);
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
                <h2 className="m-auto">Mail Confirm</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Input email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Input code ..."
                        value={code}
                        onChange={e => setCode(e.target.value)}/>
                </Form>
                <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                    <Button
                        className = "align-self-end"
                        variant={"outline-success"}
                        onClick={func_confirm}>
                        Confirm
                    </Button>
                </Row>
            </Card>
        </Container>
    );
};

export default Confirm;