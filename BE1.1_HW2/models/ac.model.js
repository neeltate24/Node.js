// 1

const mongoose = require("mongoose");

const acSchema = new mongoose.Schema(
  {
    acImageUrl: { type: String, required: true },
    acName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 0 },
    totalRatings: { type: Number, required: true },
    totalReviews: { type: Number, required: true },
    isAssuredByFlipkart: { type: Boolean, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true, min: 0, max: 100 },
    discountedPrice: { type: Number, required: true },
    itemStock: { type: Number, required: true },
    airConditionInfo: { type: String, required: true },
    offers: [{ type: String, required: true }],
    warranty: { type: String, required: true },
    variant: {
      type: String,
      required: true,
      enum: ["2023 Model - 1 Ton 3 star", "2023 Model - 1.5 Ton 3 star"],
    },
    wifiConnectivity: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const ac = mongoose.model("airCondition", acSchema);

module.exports = ac;
