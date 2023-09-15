import styles from "../styles/note.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/format-date";

interface NoteProps {
  note: NoteModel;
  className?: string;
}

const CardNote = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated: ${formatDate(updatedAt)}`;
  } else {
    createdUpdatedText = `Created: ${formatDate(createdAt)}`;
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Header>
        <Card.Title className="fw-bold">{title}</Card.Title>
      </Card.Header>
      <Card.Body className={styles.cardBody}>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className={`${styles.cardFooter}`}>
        {createdUpdatedText}
      </Card.Footer>
    </Card>
  );
};

export default CardNote;
