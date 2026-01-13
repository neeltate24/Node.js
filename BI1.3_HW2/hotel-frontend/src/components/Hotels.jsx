import { useEffect, useState } from "react";
import useFetch from "../useFetch";

const Hotels = () => {
  const { data, loading, error } = useFetch("http://localhost:5000/hotels", []);

  const [hotels, setHotels] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (data) {
      setHotels(data);
    }
  }, [data]);

  const handleDelete = async (hotelId) => {
    try {
      const response = await fetch(`http://localhost:5000/hotels/${hotelId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete hotel");
      }

      await response.json();

      setHotels((prevHotels) =>
        prevHotels.filter((hotel) => hotel._id !== hotelId)
      );

      setSuccessMessage("Hotel deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Hotels List</h2>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {hotels.map((hotel) => (
          <li key={hotel._id}>
            {hotel.name}{" "}
            <button onClick={() => handleDelete(hotel._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Hotels;
