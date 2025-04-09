import { Link } from "react-router-dom";

export default function Reviews() {
  return (
    <div id="wd-reviews">
      <ul>
        <li>
          <div id="wd-review">
            <h1>Review1 Title</h1>
            <Link to="/profile/123" className="wd-reviewer">
              <p>Reviewer</p>
            </Link>
            <p className="wd-review-content">Review1 Content</p>
          </div>
        </li>
        <li>
          <div id="wd-review">
            <h1>Review2 Title</h1>
            <Link to="/profile/123" className="wd-reviewer">
              <p>Reviewer</p>
            </Link>
            <p className="wd-review-content">Review2 Content</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
