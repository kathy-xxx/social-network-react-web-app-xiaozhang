import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Books({ books }: { books: any[] }) {
  return (
    <div id="wd-home-books" style={{ paddingTop: "20px" }}>
      {/* Row configured to show 4 columns on medium and larger screens */}
      <Row xs={1} md={4} className="g-4">
        {books.map((book) => (
          <Col key={book._id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={book.cover_image_url}
                alt={book.title}
              />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <p className="wd-book-summary">{book.summary}</p>
                  <p>
                    <strong>Average Rating:</strong> {book.average_rating}
                  </p>
                  <p>
                    <strong>Publication Date:</strong> {book.publication_date}
                  </p>
                </Card.Text>
                <Link to={`/details/${book._id}`}>
                  <Button variant="primary">View</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
