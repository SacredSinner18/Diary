import React, { useState, useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './Authentication/AuthPage'; // Auth Page
import Logout from './Authentication/Logout'; // Adjust the path as necessary
import NoteList from './NotesKeeper/NoteList'; // Notes List Page
import NoteForm from './NotesKeeper/NoteForm'; // Note Form Page
import SearchBar from './NotesKeeper/SearchBar'; // Import SearchBar component
import { useAuth } from './hooks/useAuth'; // Custom hook for authentication

const App = () => {
  const { user } = useAuth(); // Assuming this returns user state
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const addNote = (note) => {
    setNotes([...notes, note]);
    resetForm();
  };

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  }); 

    // Save notes to localStorage whenever notes state changes
    useEffect(() => {
      localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);
  

  const editNote = (id, updatedNote) => {
    setNotes(notes.map(note => (note.id === id ? { ...note, ...updatedNote } : note)));
    resetForm();
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const resetForm = () => {
    setFormTitle('');
    setFormContent('');
    setIsEditing(false);
    setCurrentNoteId(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing && currentNoteId) {
      editNote(currentNoteId, { title: formTitle, content: formContent });
    } else {
      const newNote = {
        id: Date.now(), // Unique ID for the note
        title: formTitle,
        content: formContent,
        createdAt: new Date().toLocaleString(),
        userId: user.id, // Add the user ID to the note
      };
      addNote(newNote);
    }
  };

  const handleEditNote = (note) => {
    setIsEditing(true);
    setCurrentNoteId(note.id);
    setFormTitle(note.title);
    setFormContent(note.content);
  };

  // Filter notes based on the search term
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route 
          path="/notes" 
          element={user ? 
            <div>
              <section>
                <h1>thoda likh le bhai</h1>
                <Logout /> {/* Add the Logout component */}
              </section>

              <section >
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Add SearchBar component */}
              </section>

              <section>
                <NoteForm 
                title={formTitle}
                content={formContent}
                setFormTitle={setFormTitle}
                setFormContent={setFormContent}
                handleFormSubmit={handleFormSubmit}
                handleCancelClick={resetForm}
                isEditing={isEditing}
              />
              </section>

              <section>
              <NoteList 
                notes={filteredNotes} // Pass filtered notes to NoteList
                editNote={handleEditNote} 
                deleteNote={deleteNote} 
              />
              </section>
             
            </div> : 
            <Navigate to="/" />} 
        />
      </Routes>
    </div>
  );
};

export default App;
