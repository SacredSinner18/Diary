import React, { useState } from 'react';
import './Notes.css'; // Notes styles import

const Note = ({ note, deleteNote, editNote, resetForm }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(note.content);
  const [newTitle, setNewTitle] = useState(note.title);

  const handleEdit = () => {
    editNote(note.id, { content: newContent, title: newTitle });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    resetForm(); // Call resetForm to clear the NoteForm fields
  };

  return (
    <div className="note">
      <h2>{note.title}</h2>
      <p className="note-timestamp">Created At: {note.createdAt}</p>
      {isEditing ? (
        <div>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          ></textarea>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
          />
          <button onClick={handleEdit}>Update</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <p className="note-content">{note.content}</p>
      )}
      <button onClick={() => deleteNote(note.id)}>Delete</button>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
    </div>
  );
};

export default Note;
