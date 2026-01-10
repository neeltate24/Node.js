import { useState } from "react";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedYear: "",
    genre: "",
    language: "",
    country: "",
    rating: "",
    summary: "",
    coverImageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "publishedYear" || name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      genre: formData.genre.split(",").map((g) => g.trim()),
    };

    try {
      const response = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      alert("Book added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding book");
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <br />
        <br />
        <input name="author" placeholder="Author" onChange={handleChange} />
        <br />
        <br />
        <input
          name="publishedYear"
          placeholder="Published Year"
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          name="genre"
          placeholder="Genre (comma separated)"
          onChange={handleChange}
        />
        <br />

        <br />
        <input name="language" placeholder="Language" onChange={handleChange} />
        <br />
        <br />
        <input name="country" placeholder="Country" onChange={handleChange} />
        <br />

        <br />
        <input name="rating" placeholder="Rating" onChange={handleChange} />
        <br />
        <br />
        <input name="summary" placeholder="Summary" onChange={handleChange} />
        <br />

        <br />
        <input
          name="coverImageUrl"
          placeholder="Cover Image URL"
          onChange={handleChange}
        />
        <br />

        <br />
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
