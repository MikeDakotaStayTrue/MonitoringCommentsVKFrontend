import React, {useEffect, useState, useContext} from 'react';
import Button from "react-bootstrap/Button";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {discussion_add, discussion_get, discussion_del, discussion_add_list} from "../http/monitoringAPI";
import {Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {render} from "react-dom";
import {useHistory} from "react-router-dom";
import {LIST_ROUTE, MONITOR_ROUTE} from "../utils/consts";
import {Container, Form} from "react-bootstrap";

import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js"


const Board = observer( () => {

    const [link, setLink] = useState('')
    const [desc, setDesc] = useState('')
    const [list, setList] = useState('')

    const history = useHistory()
    const [discuss, setDiscuss] = useState([])

    const {user} = useContext(Context)

    useEffect(async () => {
        const data = await discussion_get()
        setDiscuss(data.discussions)
    }, [])

    const addList = async (id) => {
        try {
            let data = await discussion_add_list(id, list, true)
        } catch (e) {
            observer.error(e);
        }
    }

    const addDiscuss = async () => {
        try {
            let data = await discussion_add(link, desc)
        } catch (e) {
            observer.error(e);
        }
    }

    const delDiscuss = async (id) => {
        try {
            let data = await discussion_del(id)
        } catch (e) {
            observer.error(e);
        }
    }

    const joinAndStartSocket = async (user, id) => {
        try {
        // Join socket connection
            const socket = io.connect("http://localhost:8082");
            socket.emit('join', 
                { email: user }, 
                err => console.error(err));

        // Start socket
            socket.emit('start', 
                { email: user,
                discussion_id: id}, 
                err => console.error(err));
        } catch (e) {
            observer.error(e);
        }
    }

    return (
        <div>
        <Form style={{width: 600}} className="p-5">
            <h2> Add new discussion </h2>
            <div class="input-group">

                <input type="link" 
                    class="form-control rounded" 
                    placeholder="Enter link" 
                    aria-label="Search" 
                    aria-describedby="search-addon"
                    value={link}
                    onChange={e => setLink(e.target.value)} />

                <input type="desc" 
                    class="form-control rounded" 
                    placeholder="Enter description" 
                    aria-label="Search" 
                    aria-describedby="search-addon"
                    value={desc}
                    onChange={e => setDesc(e.target.value)} />
    
                <button type="button" 
                    class="btn btn-outline-success" 
                    onClick={addDiscuss}>
                    Add
                </button>
            </div>
        </Form>
            
                <div>                
                    {discuss.map((item) => {
                        return (
                            <div className="col-lg-6 col-md-4 col-sm-6 mb-3"> 
                                <div className="card h-200">
                                    <div className="card-body">
                                        <h4 className="card-title">{item.description}</h4>
                                        <h5 className="card-title">User: {item.user}</h5>
                                        <h5 className="card-title">TopicID: {item.topicId}</h5>
                                        <h5 className="card-title">GroupID: {item.groupId}</h5>

                                        <div className = "input-group">
                                            <button type="button" 
                                                class="btn btn-outline-primary btn-lg"
                                                onClick={function(event){
                                                    joinAndStartSocket(item.user, item.id);
                                                    history.push(MONITOR_ROUTE + '/' + item.id);}}> 
                                                Monitor
                                            </button>
    
                                            <button type="button" 
                                                class="btn btn-outline-danger btn-lg" 
                                                onClick={function(event)
                                                    {delDiscuss(item.id);}}>
                                                Delete
                                            </button>

                                            <input type="list" 
                                                class="form-control" 
                                                value={list}
                                                placeholder="Enter list ID" 
                                                onChange={e => setList(e.target.value)} />
                                    
                                            <button type="button" 
                                                class="btn btn-outline-success btn-lg" 
                                                onClick={function(event)
                                                    {addList(item.id);}}>
                                                Add List
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
        </div>
    );
});

export default Board;
