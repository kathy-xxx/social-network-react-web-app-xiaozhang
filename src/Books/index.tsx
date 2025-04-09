import { Link } from "react-router-dom";

export default function Books() {
  return (
    <div id="wd-home-books">
      <ul>
        <li>
          <div className="wd-book">
            <Link to="/details/123" className="wd-home-book-link">
              <div>
                <h5> Book1 Title </h5>
                <p className="wd-book-summary">Book1 Summary</p>
                <button> Go </button>
              </div>
            </Link>
          </div>
        </li>
        <li>
          <div className="wd-home-book">
            <Link to="/details/456" className="wd-home-book-link">
              <div>
                <h5> Book2 Title </h5>
                <p className="wd-home-book-summary">Book2 Summary</p>
                <button> Go </button>
              </div>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}
