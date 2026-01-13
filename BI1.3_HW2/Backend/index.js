const express = require("express");
const cors = require("cors");

const { initializeDatabase } = require("./db/db.connect");
const Hotel = require("./models/hotel.model");

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
initializeDatabase();

// Get all hotels
app.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// Get hotel by name (New Hotel 1)
app.get("/hotels/:name", async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ name: req.params.name });

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel" });
  }
});

app.post("/hotels", async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(400).json({ error: "Failed to add hotel" });
  }
});

async function deleteHotelById(hotelId) {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    return deletedHotel;
  } catch (error) {
    throw error;
  }
}

app.delete("/hotels/:id", async (req, res) => {
  try {
    const deletedHotel = await deleteHotelById(req.params.id);

    if (deletedHotel) {
      res.status(200).json({ message: "Hotel deleted successfully" });
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hotel." });
  }
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
