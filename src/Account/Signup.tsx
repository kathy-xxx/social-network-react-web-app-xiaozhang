import * as client from "./client";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useState } from "react";
import { addUser } from "./Users/reducer";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({ role: "USER" });
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(addUser(currentUser));
    dispatch(setCurrentUser(currentUser));
    navigate("/profile");
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
            <Form.Group className="mb-3" controlId="signupRole">
              <Form.Label>Sign Up As</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Reader"
                  name="role"
                  id="readerRadio"
                  value="USER"
                  checked={user.role === "USER"}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Author"
                  name="role"
                  id="authorRadio"
                  value="AUTHOR"
                  checked={user.role === "AUTHOR"}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                />
              </div>
            </Form.Group>
            <Button variant="primary" className="w-100" onClick={signup}>
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
