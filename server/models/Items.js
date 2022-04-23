const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const ItemModel = mongoose.model("items", ItemSchema);
module.exports = ItemModel;
