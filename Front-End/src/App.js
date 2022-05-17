import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
// import Headers from "./Components/header/header";
import { useSelector } from "react-redux";
import Header from "./Components/header/header";
import { CssBaseline } from "@mui/material";
import UploadImagesComp from "./Components/addimage"

function App() {
  const { mode } = useSelector((state) => state.NavbarReducer);

  const theme = createTheme({
    palette: {
      mode: mode || "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <UploadImagesComp />
    </ThemeProvider>
  );
}

export default App;
