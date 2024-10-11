import { useState, useEffect } from "react";
import "./App.css";
import { FaTrash } from "react-icons/fa";

function App() {
    // Initialize notes from localStorage or an empty array if no notes exist
    const [notes, setNotes] = useState(() => {
        const storedNotes = localStorage.getItem("notes");
        return storedNotes ? JSON.parse(storedNotes) : [];
    });

    const [newNote, setNewNote] = useState("");

    // Store notes in localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem("notes", JSON.stringify(notes));
        } catch (error) {
            console.error("Failed to save notes to localStorage", error);
        }
    }, [notes]);

    // Handle adding a new note
    const handleAddNote = (e) => {
        e.preventDefault();
        if (!newNote.trim()) return;

        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        setNewNote(""); // Reset input field
    };

    // Handle deleting a note
    const handleDeleteNote = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Notes App</h1>

            <form onSubmit={handleAddNote}>
                <input
                    type="text"
                    placeholder="Write your note here..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                />
                <button type="submit">Add Note</button>
            </form>

            <div className="notes-container">
                {notes.length > 0 ? (
                    notes.map((note, index) => (
                        <div key={index} className="note">
                            <h2 className="note-title">Note {index + 1}</h2>
                            <p className="note-content">{note}</p>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteNote(index)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No notes available. Start adding some!</p>
                )}
            </div>
        </div>
    );
}

export default App;
