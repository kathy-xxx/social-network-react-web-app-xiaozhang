import { Container } from "react-bootstrap";
import Books from "../Books";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as bookClient from "../Books/client";
import { setBooks } from "../Books/reducer";

export default function Home() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
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
    author_id: currentUser ? currentUser._id : "123",
  };
  const [book, setBook] = useState<any>(defaultBook);
  const { books } = useSelector((state: any) => state.booksReducer);
  const dispatch = useDispatch();
  const fetchBooks = async () => {
    try {
      const books = await bookClient.fetchAllBooks();
      dispatch(setBooks(books));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  const addBook = async () => {
    const newBook = await bookClient.createBook(book);
    setBooks([...books, newBook]);
  };
  const deleteBook = async (bookId: string) => {
    await bookClient.deleteBook(bookId);
    dispatch(setBooks(books.filter((book: any) => book._id !== bookId)));
  };
  const updateBook = async () => {
    await bookClient.updateBook(book);
    dispatch(
      setBooks(
        books.map((b: any) => {
          if (b._id === book._id) {
            return book;
          } else {
            return b;
          }
        })
      )
    );
    setBook(defaultBook);
  };

  return (
    <Container id="wd-home" className="my-4">
      <div id="wd-home-books">
        <p>
          This is the Final Project for CS5610 by Zixuan Xiao and Yichen Zhang.
          Project GitHub repository:&nbsp;
          <a href="https://github.com/kathy-xxx/social-network-react-web-app-xiaozhang.git">
            front end
          </a>
          ,&nbsp;
          <a href="https://github.com/kathy-xxx/social-network-node-server-app-xiaozhang.git">
            back end
          </a>
          .
        </p>
        <Books
          books={books}
          book={book}
          setBook={setBook}
          addNewBook={addBook}
          deleteBook={(bookId: string) => {
            deleteBook(bookId);
          }}
          updateBook={updateBook}
        />
      </div>
    </Container>
  );
}
