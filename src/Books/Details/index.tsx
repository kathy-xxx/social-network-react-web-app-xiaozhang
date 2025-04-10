import { Container, Row, Col, Image, FormCheck } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Reviews from "../Reviews";
import * as db from "../../Database";

export default function Details() {
  // Get the book ID from the URL
  const { bid } = useParams<{ bid: string }>();
  // Use the new book data and find the specific book by its _id
  const book = db.books.find((b) => b._id === bid);
  // Filter reviews for this specific book
  const reviews = db.reviews.filter((r) => r.book_id === bid);

  // If no book is found, show a message
  if (!book) {
    return <div>Book not found</div>;
  }

  // Find the author for the book using db.users by matching author_id
  const author = db.users.find((u) => u._id === book.author_id);
  // Construct the full name of the author; fallback to "Unknown Author" if not found
  const authorName = author
    ? `${author.firstName} ${author.lastName}`
    : "Unknown Author";

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <Container id="wd-book-detail" className="my-4">
      {/* Book details header */}
      <Row className="mb-4">
        {/* Left Column: Book Cover */}
        <Col md={4}>
          <Image src={book.cover_image_url} alt={book.title} fluid />
        </Col>
        {/* Right Column: Book Info */}
        <Col md={8}>
          <h1>{book.title}</h1>
          <p>{book.summary}</p>
          <p>
            <Link to={`/profile/${book.author_id}`} className="wd-book-author">
              <strong>{authorName}</strong>
            </Link>
          </p>
          <p>
            <strong>Average Rating:</strong> {book.average_rating}
          </p>
          <p>
            <strong>Publication Date:</strong> {book.publication_date}
          </p>
          <FormCheck type="switch" label="Favorite" />
        </Col>
      </Row>
      {/* Reviews Section */}
      <Row>
        <Col>
          <h2>Reviews</h2>
          {/* Pass the reviews for this book as a prop */}
          <Reviews reviews={reviews} />
        </Col>
      </Row>
    </Container>
  );
}
