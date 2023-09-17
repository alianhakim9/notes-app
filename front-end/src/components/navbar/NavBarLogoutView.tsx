import { Button } from "react-bootstrap";

interface NavBarLogoutProps {
  onSignUpClick: () => void;
  onLoginClick: () => void;
}

const NavBarLogoutView = ({
  onSignUpClick,
  onLoginClick,
}: NavBarLogoutProps) => {
  return (
    <>
      <Button onClick={onSignUpClick}>Sign Up</Button>
      <Button onClick={onLoginClick}>Login</Button>
    </>
  );
};

export default NavBarLogoutView;
