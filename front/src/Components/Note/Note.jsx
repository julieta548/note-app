import React, { useState } from 'react'
import "./Note.css";
import axios from 'axios';
import { URI } from '../Constants';


export const Note = ({ note, getNotes }) => {

    const [noteEdited, setNoteEdited] = useState(note);

    const fillEditNote = (e) => {
        const { name, value } = e.target;
        setNoteEdited({ ...noteEdited, [name]: value })
    };

    const editNote = async (note) => {
        if(note.title === ''){
          note.title = 'No title'
        }
        if(note.description === ''){
          note.description = 'No description'
        }
        await axios.put(URI + "notes/edit/" + note.id, note)
          .then(res => {
            console.log(note.id);
            getNotes();
            
          })
          .catch(error => {
            console.error(error);
          })
      }

      const deleteNote = async (id) => {
          await axios.delete(URI + "notes/delete/" + id)
            .then(res => {
              getNotes();
            })
            .catch(error => {
              console.log(error);
            })
      }

    return (
        <div>
            <div className="card" >
                <img src="./1.png" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <a href="#" className="button btn btn-primary"><i class="bi bi-box-arrow-in-down"></i>Archive</a>
                    <a href="#" onClick={() => deleteNote(note.id)} className="button btn btn-danger"><i class="bi bi-trash"></i>Delete</a>
                    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal2" className="button btn btn-success"><i class="bi bi-pencil-square"></i>Edit</a>
                </div>
            </div>

            <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Title</label>
                                <input name='title' value={noteEdited.title} onChange={fillEditNote} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Content</label>
                                <input name='description' value={noteEdited.description} onChange={fillEditNote} type="text" className="form-control" id="exampleInputPassword1" />
                            </div>

                            <button data-bs-dismiss="modal" onClick={() => editNote(noteEdited)} type="button" className="btn btn-primary">Edit</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
