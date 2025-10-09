const express = require("express");
const app = express();

app.use(express.json()); // to parse JSON request bodies

app.get("/", (req, res) => {
  res.send("Hello, Express server.");
});

const movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972,
  },
  {
    id: 3,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: 1994,
  },
];

app.get("/movies", (req, res) => {
  res.send(movies);
});

app.post("/movies", (req, res) => {
  const newMovie = req.body;

  if (!newMovie.title || !newMovie.director || !newMovie.year) {
    res.status(400).json({ error: "Title, director, and year are required." });
  } else {
    movies.push(newMovie);
    res.status(201).json({
      message: "Movie added successfully.",
      movie: newMovie,
    });
  }
});

app.delete("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const movieIndex = movies.findIndex((movie) => movie.id == movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found." });
  } else {
    movies.splice(movieIndex, 1);
    res.status(200).json({ message: "Movie deleted successfully." });
  }
});

app.post("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const updatedMovieData = req.body;

  const movieToUpdate = movies.find((movie) => movie.id === movieId);

  if (!movieToUpdate) {
    res.status(404).json({ error: "Movie not found." });
  } else {
    if (
      !updatedMovieData.title ||
      !updatedMovieData.director ||
      !updatedMovieData.year
    ) {
      res
        .status(400)
        .json({ error: "Title, director, and year are required." });
    } else {
      Object.assign(movieToUpdate, updatedMovieData);
      res.status(200).json({
        message: "Movie updated successfully.",
        movie: movieToUpdate,
      });
    }
  }
});

const items = [
  { id: 1, itemName: "Spoon", color: "Silver", quantity: 8 },
  { id: 2, itemName: "Fork", color: "Silver", quantity: 8 },
  { id: 3, itemName: "Plate", color: "Off-White", quantity: 6 },
];

app.get("/items", (req, res) => {
  res.send(items);
});

app.post("/items", (req, res) => {
  const newItem = req.body;

  if (!newItem.itemName || !newItem.color || !newItem.quantity) {
    res
      .status(400)
      .json({ error: "Item name, color, and quantity are required." });
  } else {
    items.push(newItem);
    res.status(201).json({
      message: "Item added successfully.",
      item: newItem,
    });
  }
});

app.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const itemIndex = items.findIndex((item) => item.id == itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found." });
  } else {
    items.splice(itemIndex, 1);
    res.status(200).json({ message: "Item deleted successfully." });
  }
});

app.post("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItemData = req.body;

  const itemToUpdate = items.find((item) => item.id === itemId);

  if (!itemToUpdate) {
    res.status(404).json({ error: "Item not found." });
  } else {
    if (
      !updatedItemData.itemName ||
      !updatedItemData.color ||
      !updatedItemData.quantity
    ) {
      res
        .status(400)
        .json({ error: "Item name, color, and quantity are required." });
    } else {
      Object.assign(itemToUpdate, updatedItemData);
      res.status(200).json({
        message: "Item updated successfully.",
        item: itemToUpdate,
      });
    }
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
