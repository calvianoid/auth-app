import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import { auth } from "../helper/user";
const Login = () => {
  const [getUsername, setUsername] = useState("");
  const [getPassword, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = () => {
    setIsLoading(true);
    const data = {
      username: getUsername,
      password: getPassword,
    };
    auth("http://localhost:3001/users/login", data).then((result) => {
      sessionStorage.setItem("id", result.data.id);
      sessionStorage.setItem("username", result.data.username);
      sessionStorage.setItem("token", result.data.token);
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = "/dashboard";
      }, 1000);
    });
  };

  return (
    <div>
      <NavigationBar />
      <Container>
        <div class="row justify-content-center">
          <div class="col-lg-4">
            <h3 class="text-center">Login</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Your Username" onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
            </Form>
            <Button onClick={() => onLogin()}>
              {isLoading ? (
                <div className="spinner-border mt-2 text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
