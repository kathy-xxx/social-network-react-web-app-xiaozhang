import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  reviews: [],
};
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, action) => {
        state.reviews = action.payload;
    },
    addReview: (state, { payload: review }) => {
      const newReview: any = {
        _id: uuidv4(),
        rating: review.rating,
        title: review.title,
        content: review.content,
        review_date: review.review_date,
        book_id: review.book_id,
        user_id: review.user_id,
      };
      state.reviews = [...state.reviews, newReview] as any;
    },
    deleteReview: (state, { payload: reviewId }) => {
      state.reviews = state.reviews.filter((r: any) => r._id !== reviewId);
    },
    updateReview: (state, { payload: review }) => {
      state.reviews = state.reviews.map((r: any) =>
        r._id === review._id ? review : r
      ) as any;
    },
  },
});
export const { addReview, deleteReview, updateReview, setReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
