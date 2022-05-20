const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3000;
require('./dbConnection')
const categoryRouter = require('./routes/categoryRouter')
const bookRouter = require('./routes/booksRouter');
const authorRouter = require('./routes/authorsRouter');


app.use(cors());
app.use(express.json());

app.use("/category", categoryRouter);
app.use("/book", bookRouter);
app.use("/author", authorRouter);


app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
})

// require routes

