import "./Home.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import CategoriesSlider from "../Components/subComponents/categoriesSlider";
import AuthorsSlider from "../Components/subComponents/authorsSlider";
import Navbar from "../Components/subComponents/navbar/navbar";
import BooksSlider from "../Components/subComponents/booksSlider";
import Footer from "../Components/subComponents/Footer";
import Main from "../Components/subComponents/homeHeader";

function Home() {
  const { mode } = useSelector((state) => state.DataReducer);
  const { isSigned } = useSelector((state) => state.DataReducer);
  const theme = createTheme({
    palette: {
      mode: mode || "light",
    },
  });

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Navbar />
      {isSigned === 'false' ? <Main /> : ""}
      <BooksSlider />
      <CategoriesSlider />
      <AuthorsSlider />
      <Footer />
    </ThemeProvider>
  );
}

export default Home;