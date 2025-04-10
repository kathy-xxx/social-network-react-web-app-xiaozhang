import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  FormCheck,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Books from "../Books";
import Reviews from "../Books/Reviews";
import * as db from "../Database";

export default function Profile() {
  const { uid } = useParams<{ uid: string }>();
  const user = db.users.find((u) => u._id === uid);

  if (!user) {
    return <div>User not found.</div>;
  }

  // Retrieve favorite book relationships for this user and map to books
  const favorites = db.favoritebooks.filter((fav) => fav.user_id === uid);
  const favoriteBooks = favorites
    .map((fav) => db.books.find((book) => book._id === fav.book_id))
    .filter((book) => book !== undefined);

  // Filter reviews written by this user from the reviews database.
  const userReviews: any[] = db.reviews.filter(
    (review) => review.user_id === uid
  );

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
                  <strong>Username:</strong> {user.username}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Bio:</strong> {user.bio}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Password:</strong> {user.password}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>First Name:</strong> {user.firstName}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Last Name:</strong> {user.lastName}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Email:</strong> {user.email}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Role:</strong> {user.role}
                </ListGroupItem>
              </ListGroup>
              <div className="mt-3">
                <FormCheck type="switch" label="Follow" />
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <Link
                  to={`/following/${user._id}`}
                  className="btn btn-outline-primary"
                >
                  Following
                </Link>
                <Link
                  to={`/followers/${user._id}`}
                  className="btn btn-outline-primary"
                >
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
                  {favoriteBooks.length > 0 ? (
                    // Reuse Books component and pass favoriteBooks as prop.
                    <Books books={favoriteBooks as any[]} />
                  ) : (
                    <p>No favorite books.</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Header as="h4">Recent Reviews</Card.Header>
                <Card.Body>
                  {userReviews.length > 0 ? (
                    <Reviews reviews={userReviews as any[]} />
                  ) : (
                    <p>No recent reviews.</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
