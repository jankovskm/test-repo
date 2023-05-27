const mongoose = require("mongoose");
require("dotenv").config();

console.log(process.env.MONGO_USERNAME);

// const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.12jzasd.mongodb.net/?retryWrites=true&w=majority`;
//mongodb+srv://jankovskm:<password>@cluster0.jcdpykw.mongodb.net/?retryWrites=true&w=majority
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.jcdpykw.mongodb.net/?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected!");
  } catch (err) {
    console.error(err.message);
  }
}

connect();