import { Container, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/profile");
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card style={{ width: "350px" }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Sign In</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="signinUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                defaultValue={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                className="mb-2"
                placeholder="username"
                id="wd-username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signinPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                defaultValue={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="mb-2"
                placeholder="password"
                type="password"
                id="wd-password"
              />
            </Form.Group>
            <Link to="/profile">
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                onClick={signin}
                id="wd-sigin-btn"
              >
                Sign In
              </Button>
            </Link>
          </Form>
          <div className="mt-3 text-center">
            <span>Don't have an account? </span>
            <Link to="/register">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
