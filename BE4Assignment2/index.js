const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Recipe = require("./models/recipe.model");

app.use(cors());
app.use(express.json());

// Initialize the database
initializeDatabase();

async function createRecipe(newRecipe) {
  try {
    const recipe = new Recipe(newRecipe);
    const savedRecipe = await recipe.save();
    console.log("New Recipe added:", savedRecipe);
    return savedRecipe;
  } catch (error) {
    throw error; 
  }
}

// Function to get all recipes
async function readAllRecipes() {
  try {
    const allRecipes = await Recipe.find();
    console.log(allRecipes);
    return allRecipes;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Function to get a recipe by its title
async function readRecipeByTitle(recipeTitle) {
  try {
    const recipe = await Recipe.findOne({ title: recipeTitle });
    return recipe;
  } catch (error) {
    throw error;
  }
}

// Function to get recipes by author
async function readRecipesByAuthor(authorName) {
  try {
    const recipes = await Recipe.find({ author: authorName });
    return recipes;
  } catch (error) {
    throw error;
  }
}

// Function to get recipes by difficulty
async function readRecipesByDifficulty(level) {
  try {
    const recipes = await Recipe.find({ difficulty: level });
    return recipes;
  } catch (error) {
    throw error;
  }
}

async function updateRecipeDifficulty(recipeId, newDifficulty) {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { difficulty: newDifficulty },
      { new: true }
    );
    return updatedRecipe;
  } catch (error) {
    throw error;
  }
}

async function updateRecipeTimesByTitle(recipeTitle, newPrepTime, newCookTime) {
  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: recipeTitle },
      { prepTime: newPrepTime, cookTime: newCookTime },
      { new: true }
    );
    return updatedRecipe;
  } catch (error) {
    throw error;
  }
}

async function deleteRecipeById(recipeId) {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    return deletedRecipe;
  } catch (error) {
    throw error;
  }
}

app.delete("/recipes/:id", async (req, res) => {
  try {
    const deletedRecipe = await deleteRecipeById(req.params.id);

    if (deletedRecipe) {
      res.status(200).json({ message: "Recipe deleted successfully" });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete recipe" });
  }
});


// Add a new recipe
app.post("/recipes", async (req, res) => {
  try {
    const savedRecipe = await createRecipe(req.body);
    res.status(201).json({
      message: "Recipe added successfully",
      recipe: savedRecipe,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to add recipe.",
      details: error.message,
    });
  }
});

// Update recipe difficulty using id
app.post("/recipes/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { difficulty } = req.body;

    const updatedRecipe = await updateRecipeDifficulty(recipeId, difficulty);

    if (updatedRecipe) {
      res.status(200).json({
        message: "Recipe difficulty updated successfully",
        recipe: updatedRecipe,
      });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update recipe difficulty" });
  }
});

// Update prepTime & cookTime using title
app.post("/recipes/update/:title", async (req, res) => {
  try {
    const recipeTitle = req.params.title;
    const { prepTime, cookTime } = req.body;

    const updatedRecipe = await updateRecipeTimesByTitle(
      recipeTitle,
      prepTime,
      cookTime
    );

    if (updatedRecipe) {
      res.status(200).json({
        message: "Recipe updated successfully",
        recipe: updatedRecipe,
      });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update recipe" });
  }
});



app.get("/recipes", async (req, res) => {
  try {
    const recipes = await readAllRecipes();
    if (recipes.length !== 0) {
      res.status(200).json(recipes);
    } else {
      res.status(404).json({ error: "No recipes found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
});

// GET recipe by title
app.get("/recipes/:title", async (req, res) => {
  try {
    const recipe = await readRecipeByTitle(req.params.title);

    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe." });
  }
});

// GET recipes by author
app.get("/recipes/author/:authorName", async (req, res) => {
  try {
    const recipes = await readRecipesByAuthor(req.params.authorName);

    if (recipes.length !== 0) {
      res.status(200).json(recipes);
    } else {
      res.status(404).json({ error: "No recipes found for this author." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
});

// GET all recipes with difficulty "Easy"
app.get("/recipes/difficulty/easy", async (req, res) => {
  try {
    const recipes = await readRecipesByDifficulty("Easy");

    if (recipes.length !== 0) {
      res.status(200).json(recipes);
    } else {
      res.status(404).json({ error: "No recipes found with Easy difficulty." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the Recipe API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
