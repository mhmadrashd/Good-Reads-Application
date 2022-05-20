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
import Book from "./Components/subComponents/Author_Book/Book";
import Author from "./Components/subComponents/Author_Book/Author";
import AccountSettings from "./Components/UserForms/accountSettings";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={DataStore}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<SignUp />} />
        <Route path="/admin" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/profile/:id" element={<AccountSettings />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

    // <VerticalTabs />