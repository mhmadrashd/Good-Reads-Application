import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./booksSlice";

const BookStore = configureStore({
  reducer: {
    BookReducer: booksSlice,
  },
});
export default BookStore;
