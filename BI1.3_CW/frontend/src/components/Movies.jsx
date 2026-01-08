import { useState } from "react";
import useFetch from "../useFetch";

const Movies = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const { data, loading, error } = useFetch("http://localhost:5000/movies", []);

  //   console.log(data);

  const handleDelete = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:5000/movies/${movieId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete movie.");
      }

      const data = await response.json();

      if (data) {
        setSuccessMessage("Movie deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {data?.map((movie) => (
          <li key={movie._id}>
            {movie.title}{" "}
            <button onClick={() => handleDelete(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <p>{successMessage}</p>
    </div>
  );
};

export default Movies;
