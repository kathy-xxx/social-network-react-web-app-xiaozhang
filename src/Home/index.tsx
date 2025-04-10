import { Container } from "react-bootstrap";
import Books from "../Books";
import * as db from "../Database";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  // Retrieve books data from the database
  const defaultBook = {
    _id: "0",
    title: "New Book",
    isbn: "New Number",
    summary: "New Summary",
    publication_date: "1900-01-01",
    cover_image_url:
      "https://m.media-amazon.com/images/I/51WUPDKFMBL._SX342_SY445_.jpg",
    average_rating: "5.0",
    reviews_locked: false,
    author_id: "120",
  };
  const [books, setBooks] = useState<any[]>(db.books);
  const [book, setBook] = useState<any>(defaultBook);
  const addNewBook = () => {
    const newBook = { ...book, _id: uuidv4() };
    setBooks([...books, newBook]);
  };
  const deleteBook = (bookId: string) => {
    setBooks(books.filter((book) => book._id != bookId));
  };
  const updateBook = () => {
    setBooks(
      books.map((b) => {
        if (b._id === book._id) {
          return book;
        } else {
          return b;
        }
      })
    );
    setBook(defaultBook);
  };

  return (
    <Container id="wd-home" className="my-4">
      <div id="wd-home-books">
        {/* Pass the books to the Books component */}
        <Books
          books={books}
          book={book}
          setBook={setBook}
          addNewBook={addNewBook}
          deleteBook={deleteBook}
          updateBook={updateBook}
        />
      </div>
    </Container>
  );
}
