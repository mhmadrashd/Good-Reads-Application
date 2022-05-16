import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
// import Headers from "./Components/header/header";
import { useSelector } from "react-redux";
import Header from "./Components/header/header";
import CategoriesSlider from "./Components/categoriesSlider/index";
import { CssBaseline } from "@mui/material";

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
      <CategoriesSlider />
    </ThemeProvider>
  );
}

export default App;
