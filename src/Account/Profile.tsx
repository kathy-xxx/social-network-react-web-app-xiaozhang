import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentUser } from "../Account/reducer";
import * as client from "./client";
import * as bookClient from "../Books/client";
import * as reviewClient from "../Books/Reviews/client";
import * as followClient from "./Follows/client";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useParams<{ uid?: string }>();
  const [profile, setProfile] = useState<any>({});
  const [editing, setEditing] = useState(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const effectiveUid = uid ? uid : currentUser?._id;
  const isSelf = !uid || (currentUser && currentUser._id === effectiveUid);
  const [loading, setLoading] = useState(true);
  const [follows, setFollows] = useState<any[]>([]);
  const [favoriteBooks, setFavoriteBooks] = useState<any[]>([]);
  const [userReviews, setUserReviews] = useState<any[]>([]);
  useEffect(() => {
    async function loadEverything() {
      const fetchedProfile = isSelf
        ? await client.profile()
        : await client.findUserById(effectiveUid!);
      setProfile(fetchedProfile);
      const fetchedFollows = await followClient.fetchAllFollows();
      setFollows(fetchedFollows);
      const fetchedFavs = await bookClient.findFavoriteBooksForUser(
        fetchedProfile._id
      );
      setFavoriteBooks(fetchedFavs);
      const fetchedRevs = await reviewClient.findReviewsForUser(
        fetchedProfile._id
      );
      setUserReviews(fetchedRevs);
      setLoading(false);
    }
    if (effectiveUid) {
      loadEverything();
    }
  }, [effectiveUid, isSelf]);
  if (!effectiveUid && !loading) {
    return <div>User not found.</div>;
  }
  const isFollowing = () => {
    if (!currentUser) return false;
    return follows.some(
      (f: any) =>
        f.followee_id === effectiveUid && f.follower_id === currentUser._id
    );
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/home");
  };
  const follow = async () => {
    if (!currentUser) return false;
    const newFollow = await client.follow(effectiveUid);
    setFollows([...follows, newFollow]);
  };
  const unfollow = async () => {
    await client.unfollow(effectiveUid);
    setFollows(
      follows.filter((follow: any) => follow.followee_id !== effectiveUid)
    );
  };
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
    setEditing(false);
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
                {!editing && (
                  <ListGroup variant="flush">
                    <ListGroupItem>
                      <strong>Username:</strong> {profile.username}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Password:</strong> {profile.password}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Bio:</strong> {profile.bio}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>First Name:</strong> {profile.firstName}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Last Name:</strong> {profile.lastName}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Email:</strong> {profile.email}
                    </ListGroupItem>
                  </ListGroup>
                )}
                {editing && (
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
                )}
                <div className="mt-3 d-flex justify-content-between">
                  <Link
                    to={`/following/${profile._id}`}
                    className="btn btn-outline-primary"
                  >
                    Following
                  </Link>
                  <Link
                    to={`/followers/${profile._id}`}
                    className="btn btn-outline-primary"
                  >
                    Followers
                  </Link>
                </div>
                <div className="mt-3 justify-content-between">
                  {!editing && (
                    <Button
                      variant="outline-secondary"
                      className="w-100"
                      onClick={() => setEditing(true)}
                    >
                      Edit
                    </Button>
                  )}
                  {editing && (
                    <Button
                      variant="outline-primary"
                      className="w-100"
                      onClick={updateProfile}
                    >
                      Save
                    </Button>
                  )}
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
                    <strong>Username:</strong> {profile.username}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Bio:</strong> {profile.bio}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>First Name:</strong> {profile.firstName}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Last Name:</strong> {profile.lastName}
                  </ListGroupItem>
                </ListGroup>
                <div className="mt-3">
                  {currentUser &&
                    (isFollowing() ? (
                      <Button variant="outline-danger" onClick={unfollow}>
                        Unfollow
                      </Button>
                    ) : (
                      <Button variant="outline-primary" onClick={follow}>
                        Follow
                      </Button>
                    ))}
                </div>
                <div className="mt-3 d-flex justify-content-between">
                  <Link
                    to={`/following/${profile._id}`}
                    className="btn btn-outline-secondary"
                  >
                    Following
                  </Link>
                  <Link
                    to={`/followers/${profile._id}`}
                    className="btn btn-outline-secondary"
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
                    {favoriteBooks.map((book: any) => (
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
                            </Card.Text>
                            <Link to={`/details/${book._id}`}>
                              <Button variant="outline-secondary">View</Button>
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
                        <Link to={`/details/${review.book_id}`}>
                          <Button variant="outline-secondary">View</Button>
                        </Link>
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
