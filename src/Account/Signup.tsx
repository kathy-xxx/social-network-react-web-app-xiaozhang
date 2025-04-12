import { Container, Card, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useState } from "react";
import { addUser } from "./Users/reducer";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultUser = {
    _id: "123",
    username: "username",
    password: "password",
    firstName: "First Name",
    lastName: "Last Name",
    email: "email@email.com",
    bio: "New bio.",
    role: "USER",
  };
  const [user, setUser] = useState<any>(defaultUser);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState<string>("");
  const signup = () => {
    setError("");
    if (user.password !== verifyPassword) {
      setError("Passwords do not match.");
      return;
    }
    dispatch(addUser(user));
    dispatch(setCurrentUser(user));
    navigate("/home");
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card style={{ width: "350px" }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Sign Up</Card.Title>
          <Form id="wd-signup-form">
            <Form.Group className="mb-3" controlId="signupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupVerifyPassword">
              <Form.Label>Verify Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                onChange={(e) => setVerifyPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              onClick={signup}
            >
              Sign Up
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <span>Already have an account? </span>
            <Link to="/login">Sign In</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
