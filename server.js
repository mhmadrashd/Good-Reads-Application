const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3001;
require('./dbConnection')
const categoryRouter = require('./routes/categoryRouter')
const bookRouter = require('./routes/booksRouter');
const authorRouter = require('./routes/authorsRouter');


app.use(cors());
app.use(express.json());

app.use("/categories" , categoryRouter);
app.use("/books",bookRouter);
app.use("/authors",authorRouter);


app.listen(port,function(){
    console.log(`Example app listening on port ${port}`)
})

// require routes

