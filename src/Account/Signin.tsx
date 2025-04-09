import { Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signin() {
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
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signinPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Link to="/profile">
              <Button variant="primary" type="submit" className="w-100">
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
