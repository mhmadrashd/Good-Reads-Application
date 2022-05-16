import { createSlice } from "@reduxjs/toolkit";

export const BooksSlice = createSlice({
  name: "BooksSlice",
  initialState: { data: [] },
  reducers: {
    getBookData: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { getBookData } = BooksSlice.actions;
export default BooksSlice.reducer;
