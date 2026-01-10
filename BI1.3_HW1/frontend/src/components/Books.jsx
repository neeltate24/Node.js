import { useEffect, useState } from "react";
import useFetch from "../useFetch";

const Books = () => {
  const { data, loading, error } = useFetch("http://localhost:5000/books", []);

  const [books, setBooks] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (data) {
      setBooks(data);
    }
  }, [data]);

  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5000/books/${bookId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      await response.json();

      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));

      setSuccessMessage("Book deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Books List</h2>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title}{" "}
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Books;
