import { Link, useParams } from "react-router";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as bookClient from "../Books/client";

export default function Search() {
  // Extract both genre id and search name parameters
  const { gid, name } = useParams();
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const fetchFilteredBooks = async () => {
    try {
      if (!gid) return;
      let books = [];
      if (gid === "all") {
        books = await bookClient.fetchAllBooks();
      } else {
        books = await bookClient.findBooksByGenre(gid);
      }
      if (name && name.trim() !== "") {
        books = books.filter((book: any) =>
          book.title.toLowerCase().includes(name.toLowerCase())
        );
      }
      setFilteredBooks(books);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFilteredBooks();
  }, [gid, name]);

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
