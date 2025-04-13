import { Link, useParams } from "react-router";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Search() {
  // Extract both genre id and search name parameters
  const { gid, name } = useParams();
  const { books } = useSelector((state: any) => state.booksReducer);
  const { bookstogenres } = useSelector(
    (state: any) => state.bookstogenresReducer
  );

  let filteredBooks = [];
  if (gid === "all") {
    // If "All" genre is selected, start with all books
    filteredBooks = books;
  } else {
    // Filter books based on the selected genre
    const mappings = bookstogenres.filter(
      (mapping: any) => mapping.genre_id === gid
    );
    const validBookIds = mappings.map((mapping: any) => mapping.book_id);
    filteredBooks = books.filter((book: any) =>
      validBookIds.includes(book._id)
    );
  }

  // If a search name is provided, filter the books by title
  if (name && name.trim() !== "") {
    filteredBooks = filteredBooks.filter((book: any) =>
      book.title.toLowerCase().includes(name.toLowerCase())
    );
  }

  return (
    <Container id="wd-search" className="my-4">
      <h1>Search Results</h1>
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
