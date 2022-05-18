import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home/Home";
// import HomeUser from "./HomeUser/HomeUser";
import { Provider } from "react-redux";
import DataStore from "./Redux/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={DataStore}>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </Provider>
);
