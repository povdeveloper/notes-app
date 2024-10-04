import { useState, useEffect } from "react";
import "./App.css";
import { FaTrash } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.trim() === "") return;

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setNewNote("");
  };

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
          placeholder="Escribe tu nota aquí..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type="submit">Agregar Nota</button>
      </form>

      <div className="notes-container">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <h2 className="note-title">Nota {index + 1}</h2>
            <p className="note-content">{note}</p>
            <button
              className="delete-btn"
              onClick={() => handleDeleteNote(index)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
