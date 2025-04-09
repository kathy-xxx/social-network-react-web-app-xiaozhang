import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Books() {
  // Sample book data; in a real-world app, this would be fetched from an API.
  const books = [
    {
      id: "123",
      title: "Book1 Title",
      summary:
        "Book1 Summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      avgRating: "4.5",
      publicationDate: "2020-01-01",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "456",
      title: "Book2 Title",
      summary:
        "Book2 Summary: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      avgRating: "4.0",
      publicationDate: "2019-05-10",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "789",
      title: "Book3 Title",
      summary:
        "Book3 Summary: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      avgRating: "4.2",
      publicationDate: "2018-09-15",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "101112",
      title: "Book4 Title",
      summary:
        "Book4 Summary: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      avgRating: "4.8",
      publicationDate: "2021-03-22",
      imageUrl: "https://via.placeholder.com/150",
    },
    // Add more books if needed...
  ];

  return (
    <div id="wd-home-books" style={{ paddingTop: "20px" }}>
      {/* Row configured to show 4 columns on medium and larger screens */}
      <Row xs={1} md={4} className="g-4">
        {books.map((book) => (
          <Col key={book.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={book.imageUrl} alt={book.title} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <p className="wd-book-summary">{book.summary}</p>
                  <p>
                    <strong>Average Rating:</strong> {book.avgRating}
                  </p>
                </Card.Text>
                <Link to={`/details/${book.id}`}>
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
