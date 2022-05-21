import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/@fortawesome/fontawesome-free/css/all.css"
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Login from './Components/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<App />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
);


