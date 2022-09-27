import {useParams} from 'react-router-dom'
import React, {useEffect, useState, useContext} from 'react';
import {lists_get, list_add, list_add_word, 
    list_get_words, list_del} from "../http/monitoringAPI";
import {observer} from "mobx-react-lite";
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const List = observer(() => {
    const { id } = useParams();
    const [lists, setLists] = useState([])

    const [listName, setListName] = useState('')
    const [word, setWord] = useState('')

    const [words, setWords] = useState('')

    useEffect(async () => {
        const data = await lists_get()
        setLists(data.list)
    }, [])

    const createList = async () => {
        try {
            let data = await list_add(listName, true)
        } catch (e) {
            observer.error(e);
        }
    }

    const addWordToList = async (id) => {
        try {
            let data = await list_add_word(word, id)
        } catch (e) {
            observer.error(e);
        }
    }

    const delList = async (id) => {
        try {
            let data = await list_del(id)
        } catch (e) {
            observer.error(e);
        }
    }

    const getWords = async (id) => {
        try {
            let data = await list_get_words(id)
            alert(JSON.stringify(data.list))
        } catch (e) {
            observer.error(e);
        }
    }

    return (
        <div>
            <Form style={{width: 600}} className="p-5">
                <h2> Create new list </h2>
                <div class="input-group">

                    <input type="listName" 
                        class="form-control rounded" 
                        placeholder="Enter list Name" 
                        aria-label="Search" 
                        aria-describedby="search-addon"
                        value={listName}
                        onChange={e => setListName(e.target.value)} />
        
                    <button type="button" 
                        class="btn btn-outline-success" 
                        onClick={createList}>
                        Create
                    </button>

                </div>
            </Form>

            {lists.map((item) => {
                return (
                    <div className="col-lg-6 col-md-4 col-sm-6 mb-3"> 
                        <div className="card h-200">
                            <div className="card-body">
                                <h4 className="card-title">Name: {item.name}</h4>
                                <h4 className="card-title">List ID: {item.id}</h4>

                                <div className = "input-group">
                                    <input type="word" 
                                        class="form-control" 
                                        value={word}
                                        placeholder="Enter word"
                                        onChange={e => setWord(e.target.value)} />
                                    
                                    <button type="button" 
                                        class="btn btn-outline-success btn-lg" 
                                        onClick={function(event)
                                            {addWordToList(item.id);}}>
                                        Add word
                                    </button>

                                    <button type="button" 
                                        class="btn btn-outline-danger btn-lg"
                                        onClick={function(event)
                                            {delList(item.id);}}>
                                        Delete
                                    </button>

                                    <button type="button" 
                                        class="btn btn-outline-secondary btn-lg"
                                        placeholder="Show words" 
                                        onClick={function(event)
                                            {getWords(item.id);}}>
                                        Show words
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )})}
        </div>
    );
});


export default List;