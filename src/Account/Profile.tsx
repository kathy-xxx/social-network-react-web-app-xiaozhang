import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  FormCheck,
  Button,
  Form,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as db from "../Database";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateUser } from "./Users/reducer";
import { setCurrentUser } from "../Account/reducer";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useParams<{ uid?: string }>();
  const [profile, setProfile] = useState<any>({});
  const { reviews } = useSelector((state: any) => state.reviewsReducer);
  const { users } = useSelector((state: any) => state.usersReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchProfile = () => {
    setProfile(user);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const isSelf = uid ? false : true;
  const effectiveUid = uid ? uid : currentUser?._id;
  if (!effectiveUid) {
    return <div>User not found.</div>;
  }
  const user = users.find((u: any) => u._id === effectiveUid);
  if (!user) {
    return <div>User not found.</div>;
  }
  const favorites = db.favoritebooks.filter(
    (fav) => fav.user_id === effectiveUid
  );
  const favoriteBooks = favorites
    .map((fav) => db.books.find((book) => book._id === fav.book_id))
    .filter((book) => book !== undefined);
  const userReviews: any[] = reviews.filter(
    (review: any) => review.user_id === effectiveUid
  );
  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/home");
  };

  return (
    <Container id="wd-profile" className="my-4">
      <Row>
        {/* Left Column: User Basic Info */}
        <Col xs={12} md={4} className="mb-4">
          {isSelf && (
            <Card>
              <Card.Header as="h3">Profile</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    defaultValue={profile.username}
                    id="wd-username"
                    onChange={(e) =>
                      setProfile({ ...profile, username: e.target.value })
                    }
                  />
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    defaultValue={profile.bio}
                    id="wd-bio"
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                  />
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    defaultValue={profile.password}
                    id="wd-password"
                    onChange={(e) =>
                      setProfile({ ...profile, password: e.target.value })
                    }
                  />
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    defaultValue={profile.firstName}
                    id="wd-first-name"
                    onChange={(e) =>
                      setProfile({ ...profile, firstName: e.target.value })
                    }
                  />
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    defaultValue={profile.lastName}
                    id="wd-last-name"
                    onChange={(e) =>
                      setProfile({ ...profile, lastName: e.target.value })
                    }
                  />
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    defaultValue={profile.email}
                    id="wd-email"
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </Form>
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
                <div className="mt-3 justify-content-between">
                  <Button
                    className="w-100"
                    onClick={() => dispatch(updateUser(profile))}
                  >
                    Save
                  </Button>
                </div>
                <div className="mt-3 justify-content-between">
                  <Link
                    to="/home"
                    className="btn btn-danger w-100"
                    onClick={signout}
                  >
                    Sign Out
                  </Link>
                </div>
              </Card.Body>
            </Card>
          )}
          {!isSelf && (
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
              </Card.Body>
            </Card>
          )}
        </Col>

        {/* Right Column: Favorite Books and Recent Reviews */}
        <Col xs={12} md={8}>
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Header as="h4">Favorite Books</Card.Header>
                <Card.Body>
                  {/* Row configured to show 4 columns on medium and larger screens */}
                  <Row xs={1} md={4} className="g-4">
                    {favoriteBooks.map((book) => (
                      <Col key={book._id}>
                        <Card className="h-100">
                          <Card.Img
                            variant="top"
                            src={book.cover_image_url}
                            alt={book.title}
                          />
                          <Card.Body>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Text>
                              <p className="wd-book-summary">{book.summary}</p>
                              <p>
                                <strong>Average Rating:</strong>{" "}
                                {book.average_rating}
                              </p>
                              <p>
                                <strong>Publication Date:</strong>{" "}
                                {book.publication_date}
                              </p>
                            </Card.Text>
                            <Link to={`/details/${book._id}`}>
                              <Button variant="primary">View</Button>
                            </Link>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Header as="h4">Recent Reviews</Card.Header>
                <Card.Body>
                  <ListGroup>
                    {userReviews.map((review) => (
                      <ListGroupItem key={review._id} className="mb-2">
                        <h5>{review.title}</h5>
                        <p className="wd-review-content">{review.content}</p>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
