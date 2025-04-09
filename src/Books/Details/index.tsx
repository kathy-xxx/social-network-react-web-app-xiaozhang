import { Container, Row, Col, Image, FormCheck } from "react-bootstrap";
import { Link } from "react-router-dom";
import Reviews from "../Reviews";

export default function Details() {
  return (
    <Container id="wd-book-detail" className="my-4">
      {/* Book details header */}
      <Row className="mb-4">
        {/* Left Column: Book Cover */}
        <Col md={4}>
          <Image
            src="https://via.placeholder.com/300x400"
            alt="Book Cover"
            fluid
          />
        </Col>
        {/* Right Column: Book Info */}
        <Col md={8}>
          <h1>Book Title</h1>
          <p>
            Book Summary: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Vivamus lacinia odio vitae vestibulum vestibulum.
          </p>
          <p>
            <Link to="/profile/123" className="wd-book-author">
              <strong>by Book Author</strong>
            </Link>
          </p>
          <FormCheck type="switch" label="Favorite" />
        </Col>
      </Row>
      {/* Reviews Section */}
      <Row>
        <Col>
          <h2>Reviews</h2>
          <Reviews />
        </Col>
      </Row>
    </Container>
  );
}
