//3

const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema(
  {
    cardNumber: { type: String, required: true, unique: true },
    expiryDate: { type: String, required: true },
    cardHolderName: { type: String, required: true },
    cardtype: [
      {
        type: String,
        required: true,
        enum: ["American Express"],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const creditCard = mongoose.model("CreditCard", creditCardSchema);

module.exports = creditCard;
