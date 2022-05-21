import React from 'react'
import Footer from '../Footer';
import Navbar from '../navbar/navbar';
import Author from "./component/Author";

function AuthorPage() {
    return (
        <div>
            <Navbar />
            <Author />
            <Footer />
        </div>
    )
}

export default AuthorPage