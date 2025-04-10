import { Container } from "react-bootstrap";
import Books from "../Books";
import * as db from "../Database";

export default function Home() {
  // Retrieve books data from the database
  const books = db.books;

  return (
    <Container id="wd-home" className="my-4">
      <h1>Book Reviews Hub</h1>
      <div id="wd-home-books">
        <h2>Discover the Books</h2>
        <p>
          Explore our community's reviews on classic and contemporary books.
        </p>
        {/* Pass the books to the Books component */}
        <Books books={books} />
      </div>
    </Container>
  );
}
