import { createSlice } from "@reduxjs/toolkit";
import { favoritebooks } from "../../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  favorites: favoritebooks,
};
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, { payload: favorite }) => {
      const newFavorite: any = {
        _id: uuidv4(),
        user_id: favorite.user_id,
        book_id: favorite.book_id,
      };
      state.favorites = [...state.favorites, newFavorite] as any;
    },
    deleteFavorite: (state, { payload: favoriteId }) => {
      state.favorites = state.favorites.filter((f: any) => f._id !== favoriteId);
    },
  },
});
export const { addFavorite, deleteFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
