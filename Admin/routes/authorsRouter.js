const express = require('express');
const authorRouter = express.Router();
const Authors = require('../models/authors/authorsModel');

authorRouter.get("/",async(req,res,next)=>{
    try {
        const authors = await Authors.find({});
        res.send(authors);
    } catch (error) {
        console.log(error);
    }
    })


module.exports=authorRouter;