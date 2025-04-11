import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  NavDropdown,
  FormSelect,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import * as db from "./Database";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./Account/reducer";

export default function Navigation() {
  const genres = db.genres;
  // Use the first genre's _id as default if available.
  const [gid, setGid] = useState(genres.length > 0 ? genres[0]._id : "");

  // Get currentUser from Redux (from accountReducer)
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define the signout function to clear current user and redirect to home.
  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/home");
  };

  return (
    <Navbar bg="light" sticky="top" expand="lg" id="wd-navigation">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          Book Reviews Hub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left side navigation links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            {/* Display Profile link only when user is logged in */}
            {currentUser && (
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            )}
          </Nav>
          {/* Search form in the center-right */}
          <Form className="d-flex me-3">
            <FormSelect
              id="wd-select-genre"
              className="me-2"
              value={gid}
              onChange={(e) => setGid(e.target.value)}
            >
              {genres.map((genre: any) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </FormSelect>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              id="wd-search"
            />
            <Nav.Link as={Link} to={`/search/${gid}`}>
              <FaSearch />
            </Nav.Link>
          </Form>
          {/* Account dropdown on the right */}
          <Nav>
            <NavDropdown title="Account" id="account-dropdown">
              {currentUser ? (
                // If logged in, show "Sign Out" which triggers signout function
                <NavDropdown.Item onClick={signout}>Sign Out</NavDropdown.Item>
              ) : (
                // Otherwise, show "Sign In" and "Sign Up"
                <>
                  <NavDropdown.Item as={Link} to="/login">
                    Sign In
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">
                    Sign Up
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
