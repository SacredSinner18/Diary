import React from 'react';
import './Notes.css'; // Notes styles import

const NoteList = ({ notes = [], editNote, deleteNote }) => {
  // Check if notes is not an array or is empty
  if (!Array.isArray(notes) || notes.length === 0) {
    return <p>No notes available.</p>; // Display a message if there are no notes
  }

  return (
    <div className="note-list">
      {notes.map(note => (
        <div className="note" key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p className="note-timestamp">Created At: {note.createdAt}</p>
          <div className="note-buttons">
            <button className="edit-button" onClick={() => editNote(note)}>
              <i className="fas fa-edit"></i> Edit
            </button>
            <button className="delete-button" onClick={() => deleteNote(note.id)}>
              <i className="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;

