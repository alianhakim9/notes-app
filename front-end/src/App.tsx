import { useEffect, useState } from "react";
import { Note } from "./models/note";

function App() {
  const [notes, setNotes] = useState<Array<Note>>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch(`/api/notes`, {
          method: "GET",
        });
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <div className="container">
      {notes.map((note, index) => (
        <p>{JSON.stringify(note)}</p>
      ))}
    </div>
  );
}

export default App;
