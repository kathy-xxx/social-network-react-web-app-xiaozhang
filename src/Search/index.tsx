import { useParams } from "react-router";
import Books from "../Books";
import * as db from "../Database";
import { Container } from "react-bootstrap";

export default function Search() {
  const { gid } = useParams();
  const books = db.books;
  const bookstogenres = db.bookstogenres;

  const mappings = bookstogenres.filter((mapping) => mapping.genre_id === gid);

  const validBookIds = mappings.map((mapping) => mapping.book_id);

  const filteredBooks = books.filter((book) => validBookIds.includes(book._id));

  return (
    <Container id="wd-search" className="my-4">
      <h1> Search Results </h1>
      <Books books={filteredBooks} />
    </Container>
  );
}
