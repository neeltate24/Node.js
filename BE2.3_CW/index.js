const { initializeDatabase } = require("./db/db.connect");
const Movie = require("./models/movie.model");

initializeDatabase();

// This is where data is coming from client-side/frontend

const newMovie = {
  title: "New Movie",
  releaseYear: 2023,
  genre: ["Drama"],
  director: "Aditya Roy Chopra",
  actors: ["Actor1", "Actor2"],
  language: "Hindi",
  country: "India",
  rating: 6.1,
  plot: "A young man and woman fall in love on an Australian trip.",
  awards: "IFA Filmfare Awards",
  posterUrl: "https://example.com/new-poster1.jpg",
  trailerUrl: "https://example.com/new-trailer1.mp4",
};

async function createMovie(newMovie) {
  try {
    const movie = new Movie(newMovie);
    const saveMovie = await movie.save();
    console.log("New Movie data:", saveMovie);
  } catch (error) {
    throw error;
  }
}

// createMovie(newMovie);

// find a movie with a particular title
async function readMovieByTitle(movieTitle) {
  try {
    const movie = await Movie.findOne({ title: movieTitle });
    console.log(movie);
  } catch (error) {
    throw error;
  }
}

// readMovieByTitle("Lagaan");

// to get all the movies in the database
async function readAllMovies() {
  try {
    const allMovies = await Movie.find();
    console.log(allMovies);
  } catch (error) {
    console.log(error);
  }
}

// readAllMovies();

// get movies by director name
async function readMoviesByDirector(directorName) {
  try {
    const movies = await Movie.find({ director: directorName });
    console.log(movies);
  } catch (error) {
    throw error;
  }
}

// readMoviesByDirector("Kabir Khan");

async function readMovieByGenre(genreName) {
  try {
    const movieByGenre = await Movie.find({ genre: genreName });
    console.log(movieByGenre);
  } catch (error) {
    console.log(error);
  }
}

// readMovieByGenre("Musical");

// find movie by id and update it's rating

async function updateMovie(movieId, dataToUpdate) {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      dataToUpdate,
      { new: true } // to return the updated document
    );
    console.log("Updated Movie:", updatedMovie);
  } catch (error) {
    console.log("Error in updating Movie rating", error);
  }
}

// updateMovie("68c6e542a2bfe8beb64236ba", { rating: 8.0, releaseYear: 2002 });

// find one data and update its value

async function updateMovieDetail(movieTitle, dataToUpdate) {
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { title: movieTitle },
      dataToUpdate,
      { new: true } // to return the updated document
    );
    console.log("Updated Movie:", updatedMovie);
  } catch (error) {
    console.log("Error in updating Movie rating", error);
  }
}

updateMovieDetail("Kabhi Khushi Kabhie Gham", { releaseYear: 2001 });
