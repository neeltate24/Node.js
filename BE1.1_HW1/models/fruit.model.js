//4

const mongoose = require("mongoose");

const fruitInfoSchema = new mongoose.Schema(
  {
    fruitImageUrl: { type: String, required: true },
    fruitName: { type: String, required: true },
    fruitInfo: { type: String, required: true },
    calories: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
    protein: { type: Number, required: true },
    unsaturatedFat: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const fruitCard = mongoose.model("Fruit", fruitInfoSchema);

module.exports = fruitCard;
