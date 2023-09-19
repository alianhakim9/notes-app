import styleUtils from "../styles/utils.module.css";

import NotesPageLoggedInView from "../components/notes/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/notes/NotesPageLoggedOutView";

import { Container } from "react-bootstrap";
import { User } from "../models/user";

interface NotePageProps {
  loggedInUser: User | null;
}

const NotePage = ({ loggedInUser }: NotePageProps) => {
  return (
    <Container>
      <div className={styleUtils.blockCenter}>
        <h1>Note App</h1>
        <p className="lead">
          This project build to learn React JS with Express & Mongo DB
        </p>
      </div>
      {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
    </Container>
  );
};

export default NotePage;
