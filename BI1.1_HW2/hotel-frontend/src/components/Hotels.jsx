import useFetch from "../useFetch";

const Hotels = () => {
  const { data, loading, error } = useFetch("http://localhost:5000/hotels", []);

  const newHotel1 = {
    name: "New Hotel 1",
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div>
      <h1>All Hotels</h1>
      <ul>
        {/* Hotels from backend */}
        {data.map((hotel) => (
          <li key={hotel._id}>{hotel.name}</li>
        ))}

        {/* New Hotel 1 from JSON */}
        <li>{newHotel1.name}</li>
      </ul>
    </div>
  );
};

export default Hotels;
