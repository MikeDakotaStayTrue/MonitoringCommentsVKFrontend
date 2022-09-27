import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {add_vk} from "../../http/userAPI";

const AuthVK = ({show, onHide}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const login_vk = async () => {
        try {
            let data = await add_vk(login, password)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    VK account
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        placeholder={"Login"}/>
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder={"Password"}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={login_vk}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AuthVK;