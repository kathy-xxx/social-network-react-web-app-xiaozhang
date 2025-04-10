import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./Books/reducer";
import reviewsReducer from "./Books/Reviews/reducer";
import accountReducer from "./Account/reducer";
const store = configureStore({
    reducer: {
        booksReducer,
        reviewsReducer,
        accountReducer,
    },
});
export default store;