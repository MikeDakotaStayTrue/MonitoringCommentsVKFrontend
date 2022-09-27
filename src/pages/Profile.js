import React, {useState, useContext} from 'react';
import {Button, Container} from "react-bootstrap";
import AddVk from "../components/modals/AddVk";
import UpdateProfile from "../components/modals/UpdateProfile";
import {get_profile} from "../http/userAPI";
import {Context} from "../index";


const Profile = () => {
    const [VkAddVisible, setVkAddVisible] = useState(false)
    const [UpdateProfileVisible, setUpdateProfileVisible] = useState(false)

    const {user} = useContext(Context)
    const getProfileInfo = async () => {
        try {
            let data = await get_profile(user.email)

            user.setEmail(data.profile.email)
            user.setID(data.profile.id)
            user.setPassword(data.profile.password)
            user.setConfirmed(data.profile.confirmed)
            user.setCode(data.profile.code)
            user.setCreatedAt(data.profile.createdAt)

            // VK
            user.setPasswordVK(data.profile.passwordvk)
            user.setLoginVK(data.profile.loginvk)

        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container className="d-flex flex-column" onLoad={getProfileInfo()}>

            <h1>Profile Information: </h1>
            <h4>ID: {user._id.toString()}</h4>
            <h4>E-Mail: {user.email.toString()}</h4>
            <h4>Password (MD5): {user.password.toString()}</h4>
            <h4>Confirmed: {user.confirmed.toString()}</h4>
            <h4>Code: {user.code.toString()}</h4>
            <h4>Created At: {user.createdAt.toString()}</h4>
            
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setVkAddVisible(true)}>
                Login VK
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setUpdateProfileVisible(true)}>
                Update username
            </Button>
            <AddVk show={VkAddVisible} onHide={() => setVkAddVisible(false)}/>
            <UpdateProfile show={UpdateProfileVisible} onHide={() => setUpdateProfileVisible(false)}/>
        </Container>
    );
};

export default Profile;
