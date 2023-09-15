import { useEffect, useState } from "react";
import { Note } from "./models/note";
import { Row, Col, Container } from "react-bootstrap";
import CardNote from "./components/CardNote";
import FloatingActionButton from "./components/FloatingActionButton";

import styles from "./styles/notes-pages.module.css";

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
    <Container>
      <div className="text-center">
        <h1>Note App</h1>
        <p className="lead">
          This project build to learn React JS with Express & Mongo DB
        </p>
      </div>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes &&
          notes.map((note) => (
            <Col md={6} sm={12} lg={6} key={note._id}>
              <CardNote note={note} className={styles.note} />
            </Col>
          ))}
      </Row>
      <FloatingActionButton
        handleClick={() => {
          // TODO: show modal to create note
        }}
      />
    </Container>
  );
}

export default App;
