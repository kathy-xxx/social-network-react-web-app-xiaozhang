import { Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card style={{ width: "350px" }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Sign Up</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="signupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupVerifyPassword">
              <Form.Label>Verify Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group>
            <Link to="/register">
              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
            </Link>
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
