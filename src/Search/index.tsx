import { Link, useParams } from "react-router";
import * as db from "../Database";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Search() {
  const { gid } = useParams();
  const { books } = useSelector((state: any) => state.booksReducer);
  const { bookstogenres } = useSelector(
    (state: any) => state.bookstogenresReducer
  );
  const mappings = bookstogenres.filter(
    (mapping: any) => mapping.genre_id === gid
  );
  const validBookIds = mappings.map((mapping: any) => mapping.book_id);
  const filteredBooks = books.filter((book: any) =>
    validBookIds.includes(book._id)
  );

  return (
    <Container id="wd-search" className="my-4">
      <h1> Search Results </h1>
      {/* Row configured to show 4 columns on medium and larger screens */}
      <Row xs={1} md={4} className="g-4">
        {filteredBooks.map((book: any) => (
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
                </Card.Text>
                <Link to={`/details/${book._id}`}>
                  <Button variant="primary">View</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
