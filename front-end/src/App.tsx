import { useEffect, useState } from "react";
import { Note } from "./models/note";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import CardNote from "./components/CardNote";
import FloatingActionButton from "./components/FloatingActionButton";
import styles from "./styles/notes-pages.module.css";
import styleUtils from "./styles/utils.module.css";
import * as notesApi from "./network/notes.api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";

function App() {
  const [notes, setNotes] = useState<Array<Note>>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
  const [showAddNoteDialog, setshowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await notesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: Note) {
    try {
      await notesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const NotesGrid = (
    <Row xs={1} md={2} xl={3} className="g-4">
      {notes &&
        notes.map((note) => (
          <Col md={6} sm={12} lg={6} key={note._id}>
            <CardNote
              note={note}
              className={styles.note}
              onDeleteNoteClicked={() => {
                deleteNote(note);
              }}
              onNoteClicked={(note) => setNoteToEdit(note)}
            />
          </Col>
        ))}
    </Row>
  );

  return (
    <Container>
      <div className={styleUtils.blockCenter}>
        <h1>Note App</h1>
        <p className="lead">
          This project build to learn React JS with Express & Mongo DB
        </p>
      </div>
      {notesLoading && (
        <Spinner
          animation="border"
          variant="primary"
          className="text-center m-auto d-block"
        />
      )}
      {showNotesLoadingError && (
        <p className="text-danger">
          Something went wrong, please refresh the page :)
        </p>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? (
            NotesGrid
          ) : (
            <p className="text-center mt-4">Notes is empty, create note now!</p>
          )}
        </>
      )}
      <FloatingActionButton
        handleClick={() => {
          setshowAddNoteDialog(true);
        }}
      />
      {showAddNoteDialog && (
        <AddEditNoteDialog
          isShow={showAddNoteDialog}
          onDismiss={() => {
            setshowAddNoteDialog(false);
          }}
          onNoteSave={(newNote) => {
            setNotes([...notes, newNote]);
            setshowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSave={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
          isShow={true}
        />
      )}
    </Container>
  );
}

export default App;
