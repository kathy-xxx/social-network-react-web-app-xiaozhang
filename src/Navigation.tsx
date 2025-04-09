import { Link } from "react-router-dom";
export default function Navigation() {
  return (
    <div id="wd-navigation">
      <Link to="/home" id="wd-home-link">
        Home
      </Link>
      <select id="wd-select-one-genre">
        <option value="ALL">All</option>
        <option value="DRAMA">Drama</option>
        <option selected value="SCIFI">
          Science Fiction
        </option>
        <option value="FANTASY">Fantasy</option>
      </select>
      <input type="text" placeholder="Search" id="wd-search" />
      <Link to="/search" id="wd-search-link">
        Search
      </Link>
      <Link to="/login" id="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
