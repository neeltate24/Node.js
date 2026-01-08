//taken from be2.2_cw

const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const { initializeDatabase } = require("./db/db.connect");
const Movie = require("./models/movie.model");

// initialize the database
initializeDatabase();

async function createMovie(newMovie) {
  try {
    const movie = new Movie(newMovie);
    const saveMovie = await movie.save();
    console.log("New Movie data:", saveMovie);
    return saveMovie;
  } catch (error) {
    throw error;
  }
}

// createMovie(newMovie);
app.post("/movies", async (req, res) => {
  try {
    const savedMovie = await createMovie(req.body);
    res
      .status(201)
      .json({ message: "Movie added successfully", movie: savedMovie });
  } catch (error) {
    res.status(500).json({ error: "Failed to add movie." });
  }
});

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

async function deleteMovie(movieId) {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    return deletedMovie;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

app.delete("/movies/:movieId", async (req, res) => {
  try {
    const deletedMovie = await deleteMovie(req.params.movieId);
    if (deletedMovie) {
      res.status(200).json({ message: "Movie deleted successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete movie." });
  }
});

async function updateMovie(movieId, dataToUpdate) {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {
      new: true,
    });
    return updatedMovie;
  } catch (error) {
    console.log("Error in updating Movie rating", error);
  }
}

// updateMovie("66162fdc7f2872494a4ea9b2", { releaseYear: 2002 })

app.post("/movies/:movieId", async (req, res) => {
  try {
    const updatedMovie = await updateMovie(req.params.movieId, req.body);
    if (updatedMovie) {
      res.status(200).json({
        message: "Movie updated successfully.",
        updatedMovie: updatedMovie,
      });
    } else {
      res.status(404).json({ error: "Movie not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to update movie." });
  }
});

const PORT = 5000; //process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
