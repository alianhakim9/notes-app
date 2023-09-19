import * as authApi from "../../network/AuthApi";

import { Button, Navbar } from "react-bootstrap";
import { User } from "../../models/user";

interface NavBarLoggedInProps {
  user: User;
  onLogoutSuccessfull: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessfull,
}: NavBarLoggedInProps) => {
  async function logout() {
    try {
      await authApi.logout();
      onLogoutSuccessfull();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">Signed as : {user.username}</Navbar.Text>
      <Button onClick={logout}>Logout</Button>
    </>
  );
};

export default NavBarLoggedInView;
