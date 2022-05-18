import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
// import Headers from "./Components/header/header";
import { useSelector } from "react-redux";

import { CssBaseline } from "@mui/material";
import CategoriesSlider from "./Components/categoriesSlider";
import AuthorsSlider from "./Components/authorsSlider";
import ResponsiveAppBar from "./Components/navbar/navbar";
import BooksSlider from "./Components/Slider";

function App() {
  const { mode } = useSelector((state) => state.NavbarReducer);

  const theme = createTheme({
    palette: {
      mode: mode || "light",
    },
  });

  return (
    <ThemeProvider theme={theme} className="h-screen">
      <CssBaseline />
      <ResponsiveAppBar />
      <BooksSlider />
      <CategoriesSlider />
      <AuthorsSlider />
    </ThemeProvider>
  );
}

export default App;