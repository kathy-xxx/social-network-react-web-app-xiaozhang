import { Link } from "react-router-dom";
import Reviews from "../Reviews";

export default function Details() {
  return (
    <div id="wd-book-detail">
      <h1>Book Title</h1>
      <p>Book Summary</p>
      <Link to="/profile/123" className="wd-book-author">
          <p>Book Author</p>
      </Link>
      <input type="checkbox" name="check-favorite" id="wd-checkbox-favorite" />
      <label htmlFor="wd-checkbox-favorite">Favorite</label>
      <br />
      <Reviews />
    </div>
  );
}
