import { configureStore } from "@reduxjs/toolkit";
import viewedBooksReducer from "../features/viewedBooks/viewedBookSlice";

export const store = configureStore({
  reducer: {
    viewedBooks: viewedBooksReducer,
  },
});
