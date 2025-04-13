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
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./Account/reducer";

export default function Navigation() {
  const { genres } = useSelector((state: any) => state.genresReducer);
  // Set gid to the first genre if available, otherwise an empty string.
  const [gid, setGid] = useState(genres.length > 0 ? genres[0]._id : "");
  // New state variable to capture the search by book name
  const [searchName, setSearchName] = useState("");
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              <option key="all" value="all">
                All
              </option>
              {genres.map((genre: any) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </FormSelect>
            <FormControl
              type="search"
              placeholder="Search by book name"
              className="me-2"
              id="wd-search"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            {/* Modify the route to include the searchName parameter */}
            <Nav.Link
              as={Link}
              to={
                searchName.trim() === ""
                  ? `/search/${gid}` // No search name passed
                  : `/search/${gid}/${searchName}`
              }
            >
              <FaSearch />
            </Nav.Link>
          </Form>
          {/* Account dropdown on the right */}
          <Nav>
            <NavDropdown title="Account" id="account-dropdown">
              {currentUser ? (
                <NavDropdown.Item onClick={signout}>Sign Out</NavDropdown.Item>
              ) : (
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
