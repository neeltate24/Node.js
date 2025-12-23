const HotelByName = () => {
  const newHotel1 = {
    name: "New Hotel 1",
    location: "222 Main Street, Sheen Town",
    rating: 3.5,
    priceRange: "$$ (11-30)",
  };

  return (
    <div>
      <h1>{newHotel1.name}</h1>

      <p>
        <strong>Location:</strong> {newHotel1.location}
      </p>

      <p>
        <strong>Rating:</strong> {newHotel1.rating}
      </p>

      <p>
        <strong>Price Range:</strong> {newHotel1.priceRange}
      </p>
    </div>
  );
};

export default HotelByName;
