import { createSlice } from "@reduxjs/toolkit";

export const DataSlice = createSlice({
  name: "DataSlice",
  initialState: {
    mode: localStorage.getItem('mode') || "light",
    userData: {},
    openDialog: false,
    loginState: sessionStorage.getItem("loginState") || false,
  },
  reducers: {
    changeMood: (state, action) => {
      state.mode = action.payload === "light" ? "dark" : "light";
      localStorage.setItem('mode', state.mode);
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("img", action.payload.img)
      localStorage.setItem("id", action.payload.id)
    },
    setOpenDialog: (state, action) => {
      state.openDialog = action.payload;
    },
    setloginState: (state, action) => {
      state.loginState = action.payload;
    },
  },
});
export const { changeMood, setUserData, setOpenDialog, setloginState } = DataSlice.actions;
export default DataSlice.reducer;
