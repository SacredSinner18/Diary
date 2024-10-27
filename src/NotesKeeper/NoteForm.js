import React from 'react';
import './Notes.css'; // Notes styles import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const NoteForm = ({ title, content, setFormTitle, setFormContent, handleFormSubmit, handleCancelClick, isEditing }) => {
  return (
    <form onSubmit={handleFormSubmit} className={`note-form ${isEditing ? 'editing' : ''}`}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setFormTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setFormContent(e.target.value)}
        required
      ></textarea>
      <div className="button-group">
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} /> {isEditing ? 'Update Note' : 'Add Note'}
        </button>
        {(title || content) && (
          <button type="button" onClick={handleCancelClick} className="cancel-button">
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
