import { Link } from "react-router-dom";

export default function Table() {
  return (
    <div id="wd-user-table">
      <ul>
        <li>
          <Link to="/profile/123" className="wd-user">
            <p>User 1</p>
          </Link>
        </li>
        <li>
          <Link to="/profile/456" className="wd-user">
            <p>User 2</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
