//2

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    isNew: { type: Boolean, required: true },
    productImageUrl: { type: String, required: true },
    productType: { type: String, required: true },
    productInfo: { type: String, required: true },
    colors: {
      type: String,
      enum: ["Blue", "Red", "Green", "Orange", "Black"],
      required: true,
    },
    size: {
      type: Number,
      enum: [7, 8, 9, 10, 11],
      required: true,
    },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productCard = mongoose.model("Product", productSchema);

module.exports = productCard;
