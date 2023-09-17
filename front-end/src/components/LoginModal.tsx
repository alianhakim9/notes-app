import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/auth.api";
import * as authApi from "../network/auth.api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onLogin(credentials: LoginCredentials) {
    try {
      const user = await authApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onLogin)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="username"
            register={register}
            registerOptions={{
              required: true,
            }}
            error={errors.username}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="password"
            register={register}
            registerOptions={{
              required: true,
            }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`${styleUtils.btnCustom} w-100 align-items-center justify-content-center`}
          >
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
