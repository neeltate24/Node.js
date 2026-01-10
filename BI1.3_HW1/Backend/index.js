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
const Book = require("./models/book.model");

// initialize the database
initializeDatabase();

async function createBook(newBook) {
  try {
    const book = new Book(newBook);
    const savedBook = await book.save();
    console.log("New Book data:", savedBook);
    return savedBook;
  } catch (error) {
    throw error;
  }
}

app.post("/books", async (req, res) => {
  try {
    const savedBook = await createBook(req.body);
    res
      .status(201)
      .json({ message: "Book added successfully", book: savedBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book." });
  }
});

async function readBookByTitle(bookTitle) {
  try {
    const book = await Book.findOne({ title: bookTitle });
    return book;
  } catch (error) {
    throw error;
  }
}

app.get("/books/:title", async (req, res) => {
  try {
    const book = await readBookByTitle(req.params.title);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

async function readAllBooks() {
  try {
    const allBooks = await Book.find();
    console.log(allBooks);
    return allBooks;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books", async (req, res) => {
  try {
    const books = await readAllBooks();
    if (books.length !== 0) {
      res.status(200).json(books);
    } else {
      res.status(404).json({ error: "No books found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

async function readBooksByAuthor(authorName) {
  try {
    const books = await Book.find({ author: authorName });
    console.log(books);
    return books;
  } catch (error) {
    throw error;
  }
}

app.get("/books/author/:authorName", async (req, res) => {
  try {
    const books = await readBooksByAuthor(req.params.authorName);
    if (books.length !== 0) {
      res.status(200).json(books);
    } else {
      res.status(404).json({ error: "No books found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

async function deleteBookById(bookId) {
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    return deletedBook;
  } catch (error) {
    throw error;
  }
}

app.delete("/books/:id", async (req, res) => {
  try {
    const deletedBook = await deleteBookById(req.params.id);

    if (deletedBook) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book." });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
