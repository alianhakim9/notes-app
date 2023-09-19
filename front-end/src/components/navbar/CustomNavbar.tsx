import { Container, Nav, Navbar } from "react-bootstrap";

import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLogoutView from "./NavBarLogoutView";

import { Link } from "react-router-dom";
import { User } from "../../models/user";

interface NavBarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

const CustomNavbar = ({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavBarProps) => {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand>
          <Nav.Link as={Link} to="/">
            Note App
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar"></Navbar.Toggle>
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} to="/privacy">
              Privacy
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {loggedInUser ? (
              <NavBarLoggedInView
                user={loggedInUser}
                onLogoutSuccessfull={onLogoutSuccessful}
              />
            ) : (
              <NavBarLogoutView
                onLoginClick={onLoginClicked}
                onSignUpClick={onSignUpClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
