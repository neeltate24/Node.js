const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Hotel = require("./models/hotel.model");

app.use(express.json());

// initialize database
initializeDatabase();

// Function to create a new hotel
async function createHotel(newHotel) {
  try {
    const hotel = new Hotel(newHotel);
    const saveHotel = await hotel.save();
    console.log("New Hotel data:", saveHotel);
    return saveHotel;
  } catch (error) {
    throw error;
  }
}

// POST route to add a new hotel
app.post("/hotels", async (req, res) => {
  try {
    const savedHotel = await createHotel(req.body);
    res.status(201).json({
      message: "Hotel added successfully",
      hotel: savedHotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add hotel." });
  }
});

// 1. Function to read all hotels
async function readAllHotels() {
  try {
    const hotels = await Hotel.find();
    console.log(hotels);
    return hotels;
  } catch (error) {
    throw error;
  }
}

// Getting all hotels
app.get("/hotels", async (req, res) => {
  try {
    const hotels = await readAllHotels();
    if (hotels.length !== 0) {
      res.status(200).json(hotels);
    } else {
      res.status(404).json({ error: "No hotels found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
});

// 2. Function to read hotel by name
async function readHotelByName(hotelName) {
  try {
    const hotel = await Hotel.findOne({ name: hotelName });
    console.log(hotel);
    return hotel;
  } catch (error) {
    throw error;
  }
}

// Getting hotel by name
app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotel = await readHotelByName(req.params.hotelName);
    if (hotel) {
      res.status(200).json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});

// 3. Function to read hotel by phone number
async function readHotelByPhone(phoneNumber) {
  try {
    const hotel = await Hotel.findOne({ phoneNumber: phoneNumber });
    console.log(hotel);
    return hotel;
  } catch (error) {
    throw error;
  }
}

// Getting hotel by phone number
app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const hotel = await readHotelByPhone(req.params.phoneNumber);
    if (hotel) {
      res.status(200).json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});

// 4. Function to read hotels by rating
async function readHotelsByRating(hotelRating) {
  try {
    const hotels = await Hotel.find({ rating: hotelRating });
    console.log(hotels);
    return hotels;
  } catch (error) {
    throw error;
  }
}

// Getting hotels by rating
app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const hotels = await readHotelsByRating(req.params.hotelRating);
    if (hotels.length !== 0) {
      res.status(200).json(hotels);
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
});

// 5. Function to read hotels by category
async function readHotelsByCategory(hotelCategory) {
  try {
    const hotels = await Hotel.find({ category: hotelCategory });
    console.log(hotels);
    return hotels;
  } catch (error) {
    throw error;
  }
}

// Getting hotels by category
app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try {
    const hotels = await readHotelsByCategory(req.params.hotelCategory);
    if (hotels.length !== 0) {
      res.status(200).json(hotels);
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
});

// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
