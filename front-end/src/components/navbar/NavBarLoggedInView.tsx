import { Button, Navbar } from "react-bootstrap";
import { User } from "../../models/user";
import * as authApi from "../../network/auth.api";

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
