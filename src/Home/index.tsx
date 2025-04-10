import { Container } from "react-bootstrap";
import Books from "../Books";
import { useState } from "react";
import { addBook, deleteBook, updateBook } from "../Books/reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
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
  const { books } = useSelector((state: any) => state.booksReducer);
  const [book, setBook] = useState<any>(defaultBook);

  return (
    <Container id="wd-home" className="my-4">
      <div id="wd-home-books">
        {/* Pass the books to the Books component */}
        <Books
          books={books}
          book={book}
          setBook={setBook}
          addNewBook={() => {
            dispatch(addBook(book));
          }}
          deleteBook={() => {
            dispatch(deleteBook(book._id));
          }}
          updateBook={() => {
            dispatch(updateBook(book));
          }}
        />
      </div>
    </Container>
  );
}
