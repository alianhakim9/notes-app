import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../../network/notes.api";
import * as notesApi from "../../network/notes.api";
import TextInputField from "../form/TextInputField";
import styleUtils from "../../styles/utils.module.css";

interface AddEditNoteDialogProps {
  isShow: boolean;
  onDismiss: () => void;
  onNoteSave: (note: Note) => void;
  noteToEdit?: Note;
}

const AddEditNoteDialog = ({
  isShow,
  onDismiss,
  onNoteSave,
  noteToEdit,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await notesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await notesApi.createNote(input);
      }
      onNoteSave(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show={isShow} onHide={onDismiss} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Edit Note" : "Add Note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registerOptions={{
              required: "required",
            }}
            error={errors.title}
          />
          <TextInputField
            name="text"
            as="textarea"
            rows={5}
            placeholder="text"
            register={register}
            label="Text"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="addEditNoteForm"
          disabled={isSubmitting}
          className={styleUtils.btnCustom}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNoteDialog;
