import { Container } from "react-bootstrap";
import styleUtils from "./styles/utils.module.css";
import LoginModal from "./components/LoginModal";

import CustomNavbar from "./components/navbar/CustomNavbar";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import * as authApi from "./network/auth.api";
import SignUpModal from "./components/SignUpModal";
import NotesPageLoggedInView from "./components/notes/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/notes/NotesPageLoggedOutView";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function getLoggedInUser() {
      try {
        const user = await authApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    getLoggedInUser();
  }, []);

  return (
    <>
      <CustomNavbar
        loggedInUser={loggedInUser}
        onLoginClicked={() => {
          setShowLoginModal(true);
        }}
        onLogoutSuccessful={() => {
          setLoggedInUser(null);
        }}
        onSignUpClicked={() => {
          setShowSignUpModal(true);
        }}
      />
      <Container>
        <div className={styleUtils.blockCenter}>
          <h1>Note App</h1>
          <p className="lead">
            This project build to learn React JS with Express & Mongo DB
          </p>
        </div>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
      </Container>
      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => {
            setShowSignUpModal(false);
          }}
          onSignUpSuccessfull={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => {
            setShowLoginModal(false);
          }}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </>
  );
}

export default App;
