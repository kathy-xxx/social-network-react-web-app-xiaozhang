import { createSlice } from "@reduxjs/toolkit";
import { genres } from "../../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  genres: genres,
};
const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    addGenre: (state, { payload: genre }) => {
      const newGenre: any = {
        _id: uuidv4(),
        name: genre.name,
      };
      state.genres = [...state.genres, newGenre] as any;
    },
    deleteGenre: (state, { payload: genreId }) => {
      state.genres = state.genres.filter((g: any) => g._id !== genreId);
    },
  },
});
export const { addGenre, deleteGenre } = genresSlice.actions;
export default genresSlice.reducer;
