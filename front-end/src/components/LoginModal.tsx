import * as authApi from "../network/AuthApi";

import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/AuthApi";
import { Alert, Button, Form, Modal } from "react-bootstrap";

import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import { useState } from "react";
import { UnauthorizedError } from "../errors/HttpError";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

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
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
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
