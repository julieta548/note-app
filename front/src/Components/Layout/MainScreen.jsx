import React, { useState, useEffect } from 'react';
import { URI } from '../Constants';
import axios from 'axios';
import { Note } from '../Note/Note';

export const MainScreen = () => {
    const [notes, setNotes] = useState([]);

    const [note, setNote] = useState({
        title: '',
        description: '',
        archived : false
    });

    const [goToArchive, setGoToArchive] = useState(false);

    const getNotes = async () => {
        await axios.get(URI + "notes")
            .then(res => {
                setNotes(res.data);
            })
            .catch(error => {
                console.error(error);
            })
    }


    const fillNote = (e) => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value })
    };

    const createNote = async (note) => {
        if (note.title === '') {
            note.title = 'No title'
        }
        if (note.description === '') {
            note.description = 'No description'
        }

        await axios.post(URI + "notes", note)
            .then(res => {
                getNotes();
                setNote({
                    title: '',
                    description: ''
                })
            })
            .catch(error => {
                console.error(error);
            })
    }



    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">NOTES</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Menu
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">Create note</a></li>
                                    <li><a onClick={() => setGoToArchive(!goToArchive)} className="dropdown-item" href="#">{goToArchive ? 'Go to main screen' : 'Go to archived'}</a></li>

                                </ul>
                            </li>

                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>


            <Note notes={notes} goToArchive={goToArchive} getNotes={getNotes}></Note>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Title</label>
                                <input name='title' value={note.title} onChange={fillNote} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Content</label>
                                <input name='description' value={note.description} onChange={fillNote} type="text" className="form-control" id="exampleInputPassword1" />
                            </div>

                            <button data-bs-dismiss="modal" onClick={() => createNote(note)} type="button" className="btn btn-primary">Create</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
