import styles from "../../styles/note.module.css";
import styleUtils from "../../styles/utils.module.css";

import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../../models/note";
import { formatDate } from "../../utils/FormatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}

const CardNote = ({
  note,
  className,
  onDeleteNoteClicked,
  onNoteClicked,
}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated: ${formatDate(updatedAt)}`;
  } else {
    createdUpdatedText = `Created: ${formatDate(createdAt)}`;
  }

  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => onNoteClicked(note)}
    >
      <Card.Header>
        <Card.Title className={`${styleUtils.flexCenter} fw-bold`}>
          {title}{" "}
          <MdDelete
            className="text-danger"
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
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
