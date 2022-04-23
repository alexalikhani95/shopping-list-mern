const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;
const ItemModel = require("./models/Items");

//Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

app.get("/insert", async (req, res) => { // Going to http://localhost:5000/insert will manually insert this data into teh database
  const item = new ItemModel({ name: "Blueberries", price: 3 });
  await item.save();
  res.send("Inserted Data!");
});

app.get("/read", async (req, res) => { // Going to http://localhost:5000/read will display an array of the items
  ItemModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
