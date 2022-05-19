import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home/Home";
import SignUp from './Components/UserForms/SignUp'
import { Provider } from "react-redux";
import DataStore from "./Redux/store";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router';
import Dashboard from "./Components/dashboard/Dashboard";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={DataStore}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

    // <VerticalTabs />