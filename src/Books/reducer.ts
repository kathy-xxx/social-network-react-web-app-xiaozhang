import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  books: [],
};
const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    }, 
    addBook: (state, { payload: book }) => {
      const newBook: any = {
        _id: uuidv4(),
        title: book.title,
        isbn: book.isbn,
        summary: book.summary,
        publication_date: book.publication_date,
        cover_image_url: book.cover_image_url,
        average_rating: book.average_rating,
        reviews_locked: book.reviews_locked,
        author_id: book.author_id,
      };
      state.books = [...state.books, newBook] as any;
    },
    deleteBook: (state, { payload: bookId }) => {
      state.books = state.books.filter((b: any) => b._id !== bookId);
    },
    updateBook: (state, { payload: book }) => {
      state.books = state.books.map((b: any) =>
        b._id === book._id ? book : b
      ) as any;
    },
  },
});
export const { addBook, deleteBook, updateBook, setBooks } = booksSlice.actions;
export default booksSlice.reducer;
