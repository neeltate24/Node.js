//taken from be2.2_cw

const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Movie = require("./models/movie.model");

app.use(express.json());

// initialize the database
initializeDatabase();

// find a movie with a particular title
async function readMovieByTitle(movieTitle) {
  try {
    const movie = await Movie.findOne({ title: movieTitle });
    return movie;
  } catch (error) {
    throw error;
  }
}

app.get("/movies/:title", async (req, res) => {
  try {
    // const movieTitle = req.params.title;
    const movie = await readMovieByTitle(req.params.title);
    if (movie) {
      res.status(200).json(movie); // Send movie details as JSON response; res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie." });
  }
});

// to get all the movies in the database
async function readAllMovies() {
  try {
    const allMovies = await Movie.find();
    console.log(allMovies);
    return allMovies;
  } catch (error) {
    console.log(error);
  }
}

app.get("/movies", async (req, res) => {
  try {
    const movies = await readAllMovies();
    if (movies.length != 0) {
      res.status(200).json(movies);
    } else {
      res.status(404).json({ error: "No movies found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies." });
  }
});

// get movies by director name
async function readMoviesByDirector(directorName) {
  try {
    const movies = await Movie.find({ director: directorName });
    console.log(movies);
    return movies;
  } catch (error) {
    throw error;
  }
}

// readMoviesByDirector("Kabir Khan");

app.get("/movies/director/:directorName", async (req, res) => {
  try {
    const movies = await readMoviesByDirector(req.params.directorName);
    if (movies.length != 0) {
      res.status(200).json(movies);
    } else {
      res.status(404).json({ error: "No movies found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies." });
  }
});

async function readMoviesByGenre(genreName) {
  try {
    const movieByGenre = await Movie.find({ genre: genreName });
    console.log(movieByGenre);
    return movieByGenre;
  } catch (error) {
    console.log(error);
  }
}

// readMoviesByGenre("Musical");
app.get("/movies/genres/:genreName", async (req, res) => {
  try {
    const movies = await readMoviesByGenre(req.params.genreName);
    if (movies.length != 0) {
      res.status(200).json(movies);
    } else {
      res.status(404).json({ error: "No movies found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies." });
  }
});

const PORT = 3000; //process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
