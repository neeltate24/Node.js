import React, { useState } from "react";

const AddMovieForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    releaseYear: "",
    genre: "",
    director: "",
    actors: "",
    language: "",
    country: "",
    rating: "",
    plot: "",
    awards: "",
    posterUrl: "",
    trailerUrl: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "releaseYear" || name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }

      const data = await response.json();
      console.log("Added Movie:", data);

      setMessage("Movie added successfully!");

      setFormData({
        title: "",
        releaseYear: "",
        genre: "",
        director: "",
        actors: "",
        language: "",
        country: "",
        rating: "",
        plot: "",
        awards: "",
        posterUrl: "",
        trailerUrl: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Error adding movie");
    }
  };

  return (
    <div>
      <h2>Add New Movie</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <br />
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label>Release Year</label>
        <br />
        <input
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Genre</label>
        <br />
        <input name="genre" value={formData.genre} onChange={handleChange} />
        <br />
        <br />

        <label>Director</label>
        <br />
        <input
          name="director"
          value={formData.director}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Actors</label>
        <br />
        <input name="actors" value={formData.actors} onChange={handleChange} />
        <br />
        <br />

        <label>Language</label>
        <br />
        <input
          name="language"
          value={formData.language}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Country</label>
        <br />
        <input
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Rating</label>
        <br />
        <input name="rating" value={formData.rating} onChange={handleChange} />
        <br />
        <br />

        <label>Plot</label>
        <br />
        <input name="plot" value={formData.plot} onChange={handleChange} />
        <br />
        <br />

        <label>Awards</label>
        <br />
        <input name="awards" value={formData.awards} onChange={handleChange} />
        <br />
        <br />

        <label>Poster URL</label>
        <br />
        <input
          name="posterUrl"
          value={formData.posterUrl}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Trailer URL</label>
        <br />
        <input
          name="trailerUrl"
          value={formData.trailerUrl}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
