const { initializeDatabase } = require("./db/db.connect");

const fs = require("fs");

const Movie = require("./models/movie.model");

initializeDatabase();

// Reading the JSON file

const jsonData = fs.readFileSync("movies.json", "utf-8");
const moviesData = JSON.parse(jsonData);

// Inserting data into the database

function seedData() {
  try {
    for (const movieData of moviesData) {
      const newMovie = new Movie({
        title: movieData.title,
        releaseYear: movieData.releaseYear,
        genre: movieData.genre,
        director: movieData.director,
        actors: movieData.actors,
        language: movieData.language,
        country: movieData.country,
        rating: movieData.rating,
        plot: movieData.plot,
        awards: movieData.awards,
        posterUrl: movieData.posterUrl,
        trailerUrl: movieData.trailerUrl,
      });
      //   console.log(newMovie);
      newMovie.save();
    }
  } catch (error) {
    console.error("Error seeding the data:", error);
  }
}

seedData();
