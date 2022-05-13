const mongoose = require("mongoose");

// Connection URI
const uri = `mongodb+srv://${process.env.CONN_USER_NAME}:${process.env.CONN_PASSWORD}@goodreadsapplication.q1c0m.mongodb.net/GoodReadsApplicationDB?retryWrites=true&w=majority`;

async function run() {
  try {
    // Connect the client to the server
    await mongoose.connect(uri);
    console.log("Connected successfully to server");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
run();
