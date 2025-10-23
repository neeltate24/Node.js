const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Restaurant = require("./models/restaurant.model");

app.use(express.json());

// initialize database
initializeDatabase();

//1. Function to read all restaurants
async function readAllRestaurants() {
  try {
    const restaurants = await Restaurant.find();
    console.log(restaurants);
    return restaurants;
  } catch (error) {
    throw error;
  }
}

// Getting all restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await readAllRestaurants();
    if (restaurants.length !== 0) {
      res.status(200).json(restaurants);
    } else {
      res.status(404).json({ error: "No restaurants found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants." });
  }
});

//2. Function to read restaurant by name
async function readRestaurantByName(restaurantName) {
  try {
    const restaurant = await Restaurant.findOne({ name: restaurantName });
    console.log(restaurant);
    return restaurant;
  } catch (error) {
    throw error;
  }
}

//Getting restaurant by name
app.get("/restaurants/:restaurantName", async (req, res) => {
  try {
    const restaurant = await readRestaurantByName(req.params.restaurantName);
    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurant not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurant." });
  }
});

// 3. Function to read restaurant by phone number
async function readRestaurantByPhone(phoneNumber) {
  try {
    const restaurant = await Restaurant.findOne({ phoneNumber: phoneNumber });
    console.log(restaurant);
    return restaurant;
  } catch (error) {
    throw error;
  }
}

//Getting restaurant by phone number
app.get("/restaurants/directory/:phoneNumber", async (req, res) => {
  try {
    const restaurant = await readRestaurantByPhone(req.params.phoneNumber);
    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurant not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurant." });
  }
});

// 4. Function to read restaurants by cuisine
async function readRestaurantsByCuisine(cuisineName) {
  try {
    const restaurants = await Restaurant.find({ cuisine: cuisineName });
    console.log(restaurants);
    return restaurants;
  } catch (error) {
    throw error;
  }
}

//Getting restaurants by cuisine
app.get("/restaurants/cuisine/:cuisineName", async (req, res) => {
  try {
    const restaurants = await readRestaurantsByCuisine(req.params.cuisineName);
    if (restaurants.length !== 0) {
      res.status(200).json(restaurants);
    } else {
      res.status(404).json({ error: "Restaurant not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants." });
  }
});

// 5. Function to read restaurants by location
async function readRestaurantsByLocation(restaurantLocation) {
  try {
    const restaurants = await Restaurant.find({ location: restaurantLocation });
    console.log(restaurants);
    return restaurants;
  } catch (error) {
    throw error;
  }
}

//Getting restaurants by location
app.get("/restaurants/location/:restaurantLocation", async (req, res) => {
  try {
    const restaurants = await readRestaurantsByLocation(
      req.params.restaurantLocation
    );
    if (restaurants.length !== 0) {
      res.status(200).json(restaurants);
    } else {
      res.status(404).json({ error: "Restaurant not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants." });
  }
});

// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
