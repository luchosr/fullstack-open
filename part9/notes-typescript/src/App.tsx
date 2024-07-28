import { getAllNotes, createNote } from "./services/noteService";
import { useEffect, useState } from "react";
import { Note, NotesAppText } from "./types";

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getAllNotes().then((data) => {
      setNotes(data);
    });
  }, []);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createNote({ content: newNote }).then((data) => {
      setNotes(notes.concat(data));
    });
    setNewNote("");
  };

  const noteRemoval = (noteToRemove: Note) => {
    console.log("la note es: ", noteToRemove);
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">{NotesAppText.Add}</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content}{" "}
            <button type="button" onClick={() => noteRemoval(note)}>
              {NotesAppText.Remove}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
