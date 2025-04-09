import { Link } from "react-router-dom";
import Books from "../Books";
import Reviews from "../Books/Reviews";
export default function Profile() {
  return (
    <div id="wd-profile">
      <input type="checkbox" name="check-follow" id="wd-checkbox-follow" />
      <label htmlFor="wd-checkbox-follow">Follow</label>
      <div id="wd-profile-screen">
        <h3>Profile</h3>
        <input
          defaultValue="alice"
          placeholder="username"
          className="wd-username"
        />
        <br />
        <input
          defaultValue="123"
          placeholder="password"
          type="password"
          className="wd-password"
        />
        <br />
        <input
          defaultValue="Alice"
          placeholder="First Name"
          id="wd-firstname"
        />
        <br />
        <input
          defaultValue="Wonderland"
          placeholder="Last Name"
          id="wd-lastname"
        />
        <br />
        <input defaultValue="alice@wonderland" type="email" id="wd-email" />
        <br />
        <select defaultValue="FACULTY" id="wd-role">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Author</option>
        </select>
        <br />
        <Link to="/following/1234">Following</Link>
        <Link to="/followers/1234">Followers</Link>
        <br />
        <div id="wd-profile-favorite-books">
          <h3>Favorite Books</h3>
          <Books />
        </div>
        <div id="wd-profile-recent-reviews">
          <h3>Recent Reviews</h3>
          <Reviews />
        </div>
        <Link to="/login">Sign out</Link>
      </div>
    </div>
  );
}
