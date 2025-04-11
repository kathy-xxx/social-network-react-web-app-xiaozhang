import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./Books/reducer";
import reviewsReducer from "./Books/Reviews/reducer";
import accountReducer from "./Account/reducer";
import usersReducer from "./Account/Users/reducer";
import followsReducer from "./Account/Follows/reducer"
const store = configureStore({
    reducer: {
        booksReducer,
        reviewsReducer,
        accountReducer,
        usersReducer,
        followsReducer,
    },
});
export default store;