import { useEffect, useState } from "react";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data));
  }, []);

  return (
    <div>
      <h2>Hotels List</h2>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel._id}>{hotel.name}</li>
        ))}
      </ul>
    </div>
  );
}
