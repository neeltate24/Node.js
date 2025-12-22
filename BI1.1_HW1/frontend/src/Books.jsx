import { useEffect, useState } from "react";

function Books() {
  const [books, setBooks] = useState([]);
  const [shoeDog, setShoeDog] = useState(null);
  const [harperLeeBooks, setHarperLeeBooks] = useState([]);

  useEffect(() => {
    fetchAllBooks();
    fetchShoeDog();
    fetchHarperLeeBooks();
  }, []);

  const fetchAllBooks = async () => {
    const response = await fetch("http://localhost:5000/books");
    const data = await response.json();
    setBooks(data);
  };

  const fetchShoeDog = async () => {
    const response = await fetch("http://localhost:5000/books/Shoe Dog");
    const data = await response.json();
    setShoeDog(data);
  };

  const fetchHarperLeeBooks = async () => {
    const response = await fetch(
      "http://localhost:5000/books/author/Harper Lee"
    );
    const data = await response.json();
    setHarperLeeBooks(data);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* 1. All Book Titles */}
      <h2>All Book Titles</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>

      <hr />

      {shoeDog && (
        <>
          <h2>Book Details: Shoe Dog</h2>
          <p>
            <strong>Title:</strong> {shoeDog.title}
          </p>
          <p>
            <strong>Author:</strong> {shoeDog.author}
          </p>
          <p>
            <strong>Published Year:</strong> {shoeDog.publishedYear}
          </p>
          <p>
            <strong>Rating:</strong> {shoeDog.rating}
          </p>
          <p>
            <strong>Summary:</strong> {shoeDog.summary}
          </p>
        </>
      )}

      <hr />

      <h2>Books by Harper Lee</h2>
      <ul>
        {harperLeeBooks.map((book) => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
