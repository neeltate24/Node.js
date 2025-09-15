//5

const mongoose = require("mongoose");

const itemCardSchema = new mongoose.Schema(
  {
    itemImageUrl: { type: String, required: true },
    itemName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 0 },
    totalRatings: { type: Number, required: true },
    totalReviews: { type: Number, required: true },
    itemDescription: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    itemDiscount: { type: Number, required: true, min: 0, max: 100 },
    itemDiscountedPrice: { type: Number, required: true },
    isAssuredByFlipkart: { type: Boolean, required: true },
    isfreeDelivery: { type: Boolean, required: true },
    isLowestPrice: { type: Boolean, required: true },
    itemStock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const itemCard = mongoose.model("ItemCard", itemCardSchema);

module.exports = itemCard;
