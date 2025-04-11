import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./Books/reducer";
import reviewsReducer from "./Books/Reviews/reducer";
import accountReducer from "./Account/reducer";
import usersReducer from "./Account/Users/reducer";
const store = configureStore({
    reducer: {
        booksReducer,
        reviewsReducer,
        accountReducer,
        usersReducer,
    },
});
export default store;