const express = require('express');
const bookRouter = express.Router();
const Books = require('../models/books/booksModel');

bookRouter.get("/",async(req,res,next)=>{
    try {
        const books = await Books.find({});
        res.send(books);
    } catch (error) {
        console.log(error);
    }
    })


module.exports=bookRouter;