import { createSlice } from "@reduxjs/toolkit";

export const DataSlice = createSlice({
  name: "DataSlice",
  initialState: {
    mode: localStorage.getItem('mode') || "light",
    isSigned: localStorage.getItem('isSigned') || 'false',
    userData: {}
  },
  reducers: {
    changeMood: (state, action) => {
      state.mode = action.payload === "light" ? "dark" : "light";
      localStorage.setItem('mode', state.mode);
    },
    setIsSigned: (state, action) => {
      state.isSigned = action.payload === 'true' ? 'false' : 'true';
      localStorage.setItem('isSigned', state.isSigned);
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    }
  },
});
export const { changeMood, setIsSigned, setUserData } = DataSlice.actions;
export default DataSlice.reducer;
