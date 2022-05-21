import React from 'react'
import Footer from '../Footer';
import Navbar from '../navbar/navbar';
import Book from "./component/Book";

function BookPage() {
    return (
        <div>
            <Navbar />
            <Book />
            <Footer />
        </div>
    )
}

export default BookPage