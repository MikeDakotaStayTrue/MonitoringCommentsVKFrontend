import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {Context} from "../../index";
import {update_profile} from "../../http/userAPI";

const UpdateProfile = ({show, onHide}) => {
    const {user} = useContext(Context)
    const [newName, setNewName] = useState('')
        
    const updateProfile = async () => {
        try {
            let data = await update_profile(newName)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <Modal show={show} onHide={onHide} centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Username
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}/>
                    <Button
                        variant={"outline-success"}
                        onClick={updateProfile}>
                        Update Name
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateProfile;