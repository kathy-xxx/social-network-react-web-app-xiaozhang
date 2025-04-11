import { createSlice } from "@reduxjs/toolkit";
import { bookstogenres } from "../../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  bookstogenres: bookstogenres,
};
const bookstogenresSlice = createSlice({
  name: "bookstogenres",
  initialState,
  reducers: {
    addBookToGenre: (state, { payload: booktogenre }) => {
      const newBookToGenre: any = {
        _id: uuidv4(),
        book_id: booktogenre.book_id,
        genre_id: booktogenre.genre_id,
      };
      state.bookstogenres = [...state.bookstogenres, newBookToGenre] as any;
    },
    deleteBookToGenre: (state, { payload: booktogenreId }) => {
      state.bookstogenres = state.bookstogenres.filter((btg: any) => btg._id !== booktogenreId);
    },
  },
});
export const { addBookToGenre, deleteBookToGenre } = bookstogenresSlice.actions;
export default bookstogenresSlice.reducer;
