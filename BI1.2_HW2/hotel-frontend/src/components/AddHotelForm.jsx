import { useState } from "react";

const categoryOptions = [
  "Budget",
  "Mid-Range",
  "Luxury",
  "Boutique",
  "Resort",
  "Other",
];

const priceRangeOptions = ["$$ (11-30)", "$$$ (31-60)", "$$$$ (61+)", "Other"];

export default function AddHotelForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    rating: "",
    website: "",
    phoneNumber: "",
    checkInTime: "",
    checkOutTime: "",
    amenities: "",
    priceRange: "",
    reservationsNeeded: false,
    isParkingAvailable: false,
    isWifiAvailable: false,
    isPoolAvailable: false,
    isSpaAvailable: false,
    isRestaurantAvailable: false,
    photos: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      category: [formData.category],
      amenities: formData.amenities.split(","),
      photos: formData.photos.split(","),
      rating: Number(formData.rating),
    };

    await fetch("http://localhost:5000/hotels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Hotel added successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Hotel</h2>
      <input name="name" placeholder="Hotel Name" onChange={handleChange} />
      <br />
      <br />
      <select name="category" onChange={handleChange}>
        <option value="">Select Category</option>
        {categoryOptions.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <br />
      <br />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <br />

      <br />
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        onChange={handleChange}
      />
      <br />
      <br />
      <input name="website" placeholder="Website" onChange={handleChange} />
      <br />

      <br />
      <input
        name="phoneNumber"
        placeholder="Phone Number"
        onChange={handleChange}
      />
      <br />

      <br />
      <input
        name="checkInTime"
        placeholder="Check In Time"
        onChange={handleChange}
      />
      <br />

      <br />
      <input
        name="checkOutTime"
        placeholder="Check Out Time"
        onChange={handleChange}
      />
      <br />
      <br />
      <input
        name="amenities"
        placeholder="Amenities (comma separated)"
        onChange={handleChange}
      />
      <br />

      <br />
      <select name="priceRange" onChange={handleChange}>
        <option value="">Select Price Range</option>
        {priceRangeOptions.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <br />
      <br />
      <label>
        <input
          type="checkbox"
          name="reservationsNeeded"
          onChange={handleChange}
        />
        Reservations Needed
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          name="isParkingAvailable"
          onChange={handleChange}
        />{" "}
        Parking
      </label>
      <br />
      <label>
        <input type="checkbox" name="isWifiAvailable" onChange={handleChange} />{" "}
        Wifi
      </label>
      <br />
      <label>
        <input type="checkbox" name="isPoolAvailable" onChange={handleChange} />{" "}
        Pool
      </label>
      <br />
      <label>
        <input type="checkbox" name="isSpaAvailable" onChange={handleChange} />{" "}
        Spa
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="isRestaurantAvailable"
          onChange={handleChange}
        />{" "}
        Restaurant
      </label>
      <br />
      <br />
      <input
        name="photos"
        placeholder="Photo URLs (comma separated)"
        onChange={handleChange}
      />
      <br />
      <br />
      <button type="submit">Add Hotel</button>
    </form>
  );
}
