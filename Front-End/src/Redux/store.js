import { configureStore } from "@reduxjs/toolkit";
import NavbarSlice from "./NavbarSlice";

const NavbarStore = configureStore({
  reducer: {
    NavbarReducer: NavbarSlice,
  },
});
export default NavbarStore;
