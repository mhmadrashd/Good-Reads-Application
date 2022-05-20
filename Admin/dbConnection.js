// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test');

const mongoose = require('mongoose');

// Connection URI
const uri =
  // "mongodb+srv://TrialMern:mern12345678@cluster0.cr7ks.mongodb.net/Trial";
  "mongodb+srv://mern:mern145@goodreadsapplication.q1c0m.mongodb.net/GoodReadsApplicationDB"

async function run() {
  try {
    await mongoose.connect(uri);

    console.log("Connected successfully to database");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
run()