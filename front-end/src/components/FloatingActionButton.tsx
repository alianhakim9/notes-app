import styles from "../styles/fab.module.css";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

interface FloatingActionProps {
  handleClick: () => void;
}

const FloatingActionButton = ({ handleClick }: FloatingActionProps) => {
  return (
    <Button variant="primary" className={styles.fab} onClick={handleClick}>
      <FaPlus />
    </Button>
  );
};

export default FloatingActionButton;
