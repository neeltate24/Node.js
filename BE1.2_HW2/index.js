const { initializeDatabase } = require("./db/db.connect");

const fs = require("fs");

const Book = require("./models/book.model");

initializeDatabase();

// Read books data from JSON file
const jsonData = fs.readFileSync("books.json", "utf-8");
const booksData = JSON.parse(jsonData);

// Seeding into database

function seedData() {
  try {
    for (const bookData of booksData) {
      const newBook = new Book({
        title: bookData.title,
        author: bookData.author,
        publishedYear: bookData.publishedYear,
        genre: bookData.genre,
        language: bookData.language,
        country: bookData.country,
        rating: bookData.rating,
        summary: bookData.summary,
        coverImageUrl: bookData.coverImageUrl,
      });
      newBook.save();
    }
    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

seedData();
