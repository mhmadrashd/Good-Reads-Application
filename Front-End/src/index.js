import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import NavbarStore from "./Redux/navbar/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={NavbarStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
