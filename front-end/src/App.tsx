import * as authApi from "./network/AuthApi";
import LoginModal from "./components/LoginModal";
import CustomNavbar from "./components/navbar/CustomNavbar";
import SignUpModal from "./components/SignUpModal";

import NotePage from "./pages/NotePage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPage from "./pages/PrivacyPage";

import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import { Container } from "react-bootstrap";

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
      <BrowserRouter>
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
        <Routes>
          <Route path="/" element={<NotePage loggedInUser={loggedInUser} />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
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
