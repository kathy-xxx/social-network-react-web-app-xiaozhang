import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Books({
  books,
  book,
  setBook,
  addNewBook,
  deleteBook,
  updateBook,
}: {
  books: any[];
  book: any;
  setBook: (book: any) => void;
  addNewBook: () => void;
  deleteBook: (bookId: string) => void;
  updateBook: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isAdmin = () => currentUser.role === "ADMIN";
  const isAuthor = () => currentUser.role === "AUTHOR";
  const isBookAuthor = (book: any) => book.author_id === currentUser._id;
  return (
    <div id="wd-home-books" style={{ paddingTop: "20px" }}>
      <h1>Book Reviews Hub</h1>
      {/* Add New Book Section */}
      {currentUser && isAuthor() && (
        <Card className="mb-4">
          <Card.Header>Add New Book</Card.Header>
          <Card.Body>
            <Form id="wd-new-book">
              <Form.Group controlId="bookTitle" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter book title"
                  value={book.title}
                  onChange={(e) => setBook({ ...book, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="bookSummary" className="mb-3">
                <Form.Label>Summary</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter book summary"
                  value={book.summary}
                  onChange={(e) =>
                    setBook({ ...book, summary: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  addNewBook();
                }}
                id="wd-add-book-click"
              >
                Add
              </Button>
              <Button
                variant="warning"
                onClick={(e) => {
                  e.preventDefault();
                  updateBook();
                }}
                id="wd-update-book-click"
              >
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <h2>Discover the Books</h2>
      <p>Explore our community's reviews on classic and contemporary books.</p>
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
                </Card.Text>
                <Link to={`/details/${book._id}`}>
                  <Button variant="primary">View</Button>
                </Link>
                {currentUser && (isAdmin() || isBookAuthor(book)) && (
                  <>
                    <Button
                      variant="warning"
                      onClick={() => setBook(book)}
                      id="wd-edit-book-click"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteBook(book._id)}
                      id="wd-delete-book-click"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
