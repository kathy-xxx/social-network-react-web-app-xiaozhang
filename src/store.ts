import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./Books/reducer";
import reviewsReducer from "./Books/Reviews/reducer";
const store = configureStore({
    reducer: {
        booksReducer,
        reviewsReducer,
    },
});
export default store;