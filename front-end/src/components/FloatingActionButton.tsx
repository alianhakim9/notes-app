import styles from "../styles/fab.module.css";
import { Button } from "react-bootstrap";

interface FloatingActionProps {
  handleClick: () => void;
}

const FloatingActionButton = ({ handleClick }: FloatingActionProps) => {
  return (
    <Button variant="primary" className={styles.fab} onClick={handleClick}>
      <i className="bi bi-plus-lg"></i>
    </Button>
  );
};

export default FloatingActionButton;
