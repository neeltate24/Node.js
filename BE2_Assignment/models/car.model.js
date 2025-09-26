const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    bodyStyle: { type: String, required: true },
    fuelType: {
      type: String,
      required: true,
      enum: ["Gasoline", "Diesel", "Electric", "Hybrid", "Other"],
    },
    transmission: {
      type: String,
      required: true,
      enum: ["Manual", "Automatic", "Other"],
    },
    engine: { type: String, required: true },
    mileage: { type: Number, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    condition: {
      type: String,
      required: true,
      enum: ["New", "Used"],
    },
    description: { type: String },
    photos: [{ type: String }],
    inMarket: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
