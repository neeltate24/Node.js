const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Restaurant = require("./models/restaurant.model");

app.use(express.json());

// initialize database
initializeDatabase();

// Create a new restaurant
async function createRestaurant(newRestaurant) {
  try {
    const restaurant = new Restaurant(newRestaurant);
    const saveRestaurant = await restaurant.save();
    console.log("New Restaurant data:", saveRestaurant);
    return saveRestaurant;
  } catch (error) {
    throw error;
  }
}

app.post("/restaurants", async (req, res) => {
  try {
    const savedRestaurant = await createRestaurant(req.body);
    res.status(201).json({
      message: "Restaurant added successfully",
      restaurant: savedRestaurant,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add restaurant." });
  }
});

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
    if (restaurants.length != 0) {
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

// Function to delete a restaurant by ID
async function deleteRestaurant(restaurantId) {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    return deletedRestaurant;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// DELETE route to remove a restaurant
app.delete("/restaurants/:restaurantId", async (req, res) => {
  try {
    const deletedRestaurant = await deleteRestaurant(req.params.restaurantId);
    if (deletedRestaurant) {
      res.status(200).json({ message: "Restaurant deleted successfully." });
    } else {
      res.status(404).json({ error: "Restaurant not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete restaurant." });
  }
});

// Function to update a restaurant by ID
async function updateRestaurant(restaurantId, dataToUpdate) {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      dataToUpdate,
      { new: true } // return updated document
    );
    return updatedRestaurant;
  } catch (error) {
    console.log("Error in updating restaurant", error);
    throw error;
  }
}

// Route to update a restaurant
app.post("/restaurants/:restaurantId", async (req, res) => {
  try {
    const updatedRestaurant = await updateRestaurant(
      req.params.restaurantId,
      req.body
    );
    if (updatedRestaurant) {
      res.status(200).json({
        message: "Restaurant updated successfully.",
        updatedRestaurant: updatedRestaurant,
      });
    } else {
      res.status(404).json({ error: "Restaurant not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update restaurant." });
  }
});

// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
