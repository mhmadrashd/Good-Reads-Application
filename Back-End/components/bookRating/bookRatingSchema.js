const mongoose = require("mongoose");

const bookRatingSchema = new mongoose.Schema({
    _id: {
        type: Number,
        min: 0,
        },
    user: {
        type: mongoose.Schema.Types.Number,
        ref: "user",
        required: [true, "Please enter a User"],
        },
    book: {
        type: mongoose.Schema.Types.Number,
        ref: "book",
        required: [true, "Please enter a Book"],
        },
    rating: {
        type: Number,
        required: [true, "Please enter Your rating"]
        },
    review: {
        type: String,
        required: [true, "Please enter Your review"]
    }

});