// require any models
require("../models/Task");

const mongoose = require("mongoose");
const dbURI = process.env.URL
const options = {
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Connection established!");
  },
  err => {
    console.log("Error: ", err);
  }
);