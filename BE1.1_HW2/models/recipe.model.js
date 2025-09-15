// 2

const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    recipeImageUrl: { type: String, required: true },
    recipeName: { type: String, required: true },
    recipeType: { type: String },
    servings: { type: Number, required: true },
    preppingTime: { type: String, required: true },
    cookingTime: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    directions: [{ type: String, required: true }],
    Notes: { type: String },
  },
  {
    timestamps: true,
  }
);

const recipe = mongoose.model("Recipe", recipeSchema);

module.exports = recipe;
