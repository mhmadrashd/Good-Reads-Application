import React from "react";
import "./index.css";
import Home from "./Home/Home";
import SignUp from './Components/UserForms/SignUp'
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Components/dashboard/Dashboard";
import Login from "./Components/admins/Components/Login/Login";
import ThreeTabs from "./Components/admins/Components/Controls/ThreeTabs"
import "@fortawesome/fontawesome-free/css/all.css"
import AuthorPage from "./Components/subComponents/Author_Book/Author";
import BookPage from "./Components/subComponents/Author_Book/Book";


import { PrivateRoute } from "./assets/handleErrors";
import AccSettings from "./Components/UserForms/AccSettings";
import { useSelector } from "react-redux";


function App() {
    const { loginState } = useSelector((state) => state.DataReducer);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/front-end" element={<Home />} />
                {/*<Route path="/" element={<PrivateRoute2><Home /></PrivateRoute2>} />*/}
                <Route path="/admin/dashboard" element={<PrivateRoute><ThreeTabs /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/book/:id" element={<PrivateRoute><BookPage /></PrivateRoute>} />
                <Route path="/author/:id" element={<PrivateRoute><AuthorPage /></PrivateRoute>} />
                <Route path="/profile/:id" element={<PrivateRoute><AccSettings /></PrivateRoute>} />
                {!loginState ?
                    <Route path="/login" element={<SignUp />} /> :
                    <Route path="/home" element={<Home />} />
                }
                {!loginState ?
                    <Route path="/admin" element={<Login />} /> :
                    <Route path="/admin/dashboard" element={<PrivateRoute><ThreeTabs /></PrivateRoute>} />
                }


                {/*<Route path="/*" element={<Navigate to="/home" />} />*/}
            </Routes>
        </BrowserRouter>
    )
}

export default App