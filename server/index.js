const express = require("express");
const  mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;

//Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

app.listen(3001, () => {
  console.log(`Server connected on port ${PORT}`);
});
