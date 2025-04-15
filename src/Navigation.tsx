import * as accountClient from "./Account/client";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  NavDropdown,
  FormSelect,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./Account/reducer";
import * as genreClient from "./Search/Genres/client";

export default function Navigation() {
  const [genres, setGenres] = useState<any[]>([]);
  const fetchGenres = async () => {
    try {
      const genres = await genreClient.fetchAllGenres();
      setGenres(genres);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchGenres();
  }, []);
  const [gid, setGid] = useState("all");
  const [searchName, setSearchName] = useState("");
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signout = async () => {
    await accountClient.signout();
    dispatch(setCurrentUser(null));
    navigate("/home");
  };
  const isAdmin = () => {
    if (!currentUser) return false;
    return currentUser.role === "ADMIN";
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
            {currentUser && isAdmin() && (
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
            )}
          </Nav>
          {/* Search form in the center-right */}
          <Form
            className="d-flex align-items-center me-3"
            onSubmit={(e) => {
              e.preventDefault();
              // Navigate based on current gid and searchName values.
              const trimmedName = searchName.trim();
              if (trimmedName === "") {
                navigate(`/search/${gid}`);
              } else {
                navigate(`/search/${gid}/${trimmedName}`);
              }
            }}
          >
            <FormSelect
              id="wd-select-genre"
              className="me-2"
              value={gid}
              onChange={(e) => setGid(e.target.value)}
              style={{ width: "100px" }} // set a fixed width for the genre dropdown
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
              style={{ flexGrow: 1, minWidth: "250px" }} // make search input larger
            />
            <Button
              variant="outline-secondary"
              type="submit"
              className="ms-2 d-flex align-items-center"
            >
              <FaSearch />
            </Button>
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
