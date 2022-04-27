const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const ItemModel = require("./models/Items");

app.use(cors());
app.use(express.json()); // Allows the server to recieve json

//Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

app.post("/addproduct", async (req, res) => {
  const name = req.body.name
  const price = req.body.price

  const item = new ItemModel({ name: name, price: price });
  await item.save();
  res.send("Product successfully added");
});

app.get("/read", async (req, res) => {
  // Going to http://localhost:5000/read will display an array of the items
  ItemModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", async (req, res) => {
  const newPrice = req.body.newPrice
  const id = req.body.id

  try {
    await ItemModel.findById(id, (error, itemToUpdate) => {
      itemToUpdate.price = newPrice;
      itemToUpdate.save()
    })
  } catch(err) {
    console.log(err)
  }

  res.send('Item Updated')
})

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  await ItemModel.findByIdAndRemove(id).exec()
  res.send("item deleted")
})

app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
