import { Link, useParams } from "react-router";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as bookClient from "../Books/client";

export default function Search() {
  const { gid, name } = useParams<{ gid: string; name?: string }>();
  const [localBooks, setLocalBooks] = useState<any[]>([]);
  const [remoteBooks, setRemoteBooks] = useState<any[]>([]);
  const fetchLocal = async () => {
    if (!gid) return;
    let books =
      gid === "all"
        ? await bookClient.fetchAllBooks()
        : await bookClient.findBooksByGenre(gid);
    if (name?.trim()) {
      books = books.filter((b: any) =>
        b.title.toLowerCase().includes(name.toLowerCase())
      );
    }
    setLocalBooks(books);
  };
  const fetchRemote = async () => {
    if (name?.trim() && localBooks.length === 0) {
      const results = await bookClient.searchGoogleBooks(name);
      setRemoteBooks(results);
    } else {
      setRemoteBooks([]);
    }
  };
  useEffect(() => {
    fetchLocal();
  }, [gid, name]);
  useEffect(() => {
    fetchRemote();
  }, [localBooks, name]);

  return (
    <Container id="wd-search" className="my-4">
      <h1>Search Results</h1>
      {localBooks.length > 0 && (
        <Row xs={1} md={4} className="g-4 mb-4">
          {localBooks.map((book) => (
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
                    {book.summary}
                    <br />
                    <strong>Avg. Rating:</strong> {book.average_rating}
                  </Card.Text>
                  <Link to={`/details/${book._id}`}>
                    <Button>View Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {localBooks.length === 0 && remoteBooks.length > 0 && (
        <>
          <h2>More results from Google Books</h2>
          <Row xs={1} md={4} className="g-4">
            {remoteBooks.map((b) => (
              <Col key={b.id}>
                <Card className="h-100">
                  <Card.Img variant="top" src={b.thumbnail} alt={b.title} />
                  <Card.Body>
                    <Card.Title>{b.title}</Card.Title>
                    <Card.Text>
                      <em>{b.authors}</em>
                      <br />
                      {b.summary}
                    </Card.Text>
                    {/* external link out to Google Books detail page */}
                    <a
                      href={b.infoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>View on Google Books</Button>
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* If neither local nor remote yielded anything */}
      {localBooks.length === 0 && remoteBooks.length === 0 && (
        <p className="text-muted">No matches locally or on Google Books.</p>
      )}
    </Container>
  );
}
