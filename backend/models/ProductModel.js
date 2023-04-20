const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    
    price: { type: Number, require: true },

    img: { type: String, require: true},

    description: { type: String, require: true },

    category: { type: String, require: true }

  }
);


const Product = mongoose.model("Product", productSchema);

module.exports = Product;