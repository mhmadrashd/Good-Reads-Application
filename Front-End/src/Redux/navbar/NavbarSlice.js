import { createSlice } from "@reduxjs/toolkit";

export const NavbarSlice = createSlice({
  name: "NavbarSlice",
  initialState: { mode: "light" },
  reducers: {
    changeMood: (state, action) => {
      state.mode = action.payload === "light" ? "dark" : "light";
    },
  },
});
export const { changeMood } = NavbarSlice.actions;
export default NavbarSlice.reducer;
