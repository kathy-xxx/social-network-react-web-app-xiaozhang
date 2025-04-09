import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  FormCheck,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Books from "../Books";
import Reviews from "../Books/Reviews";

export default function Profile() {
  return (
    <Container id="wd-profile" className="my-4">
      <Row>
        {/* Left Column: User Basic Info */}
        <Col xs={12} md={4} className="mb-4">
          <Card>
            <Card.Header as="h3">Profile</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <strong>Username:</strong> alice
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Bio:</strong> Hello World
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Password:</strong> ******
                </ListGroupItem>
                <ListGroupItem>
                  <strong>First Name:</strong> Alice
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Last Name:</strong> Smith
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Email:</strong> alice@example.com
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Role:</strong> User
                </ListGroupItem>
              </ListGroup>
              <div className="mt-3">
                <FormCheck type="switch" label="Follow" />
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <Link to="/following/1234" className="btn btn-outline-primary">
                  Following
                </Link>
                <Link to="/followers/1234" className="btn btn-outline-primary">
                  Followers
                </Link>
              </div>
              <div className="mt-3">
                <Link to="/login" className="btn btn-danger w-100">
                  Sign Out
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column: Favorite Books and Recent Reviews */}
        <Col xs={12} md={8}>
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Header as="h4">Favorite Books</Card.Header>
                <Card.Body>
                  <Books />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Header as="h4">Recent Reviews</Card.Header>
                <Card.Body>
                  <Reviews />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
