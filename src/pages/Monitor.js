import React, {useEffect, useRef, useState, useContext} from 'react';

import {useParams} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import {monitor_get_posts, discussion_get_accepted} from "../http/monitoringAPI"
import {Context} from "../index";
import {Container, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js"


const Monitor = observer(() => {
    const { id } = useParams();
    const socket = useRef()
    const {user} = useContext(Context)
    const [posts, setPosts] = useState([])

    const updateMessages = async () => {
        try {
            const data = await monitor_get_posts(id)
            setPosts(data.posts)
        } catch (e) {
            observer.error(e);
        }
    }


    return (
        <div>
            <Form style={{width: 600}} className="p-5">
            <div>
                <button type="button" 
                    class="btn btn-outline-success"
                    onClick={updateMessages} >
                    Update
                </button>
            </div>
            </Form>
            <div>
                {posts.map((item) => {
                    return (
                        <div className="col-lg-6 col-md-4 col-sm-6 mb-3"> 
                            <div className="card h-200">
                                <div className="card-body">
                                    <h4 className="card-title">User Link: {item.user_link}</h4>
                                    <h4 className="card-title">Text: {item.text}</h4>
                                </div>
                            </div>
                        </div>
                    )})}
            </div>
        </div>
    );
});

export default Monitor;
