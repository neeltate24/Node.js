const { initializeDatabase } = require("./db/db.connect");
const Restaurant = require("./models/restaurant.model");

initializeDatabase();

// This is where data is coming from client-side/frontend

/*
const newRestaurant = {
  name: "Cha Cha",
  cuisine: ["Spanish"],
  location: "123 Main Street, Anytown",
  rating: 4.0,
  reviews: [],
  website: "https://example.com",
  phoneNumber: "+1234567890",
  openHours: "Mon-Sun: 11:00 AM - 10:00 PM",
  priceRange: "$$ (11-30)",
  reservationsNeeded: true,
  isDeliveryAvailable: true,
  menuUrl: "https://example.com/menu",
  photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
};
*/

// 1

/*
const newRestaurant = {
  name: "Somi",
  cuisine: ["Greek"],
  location: "11 Main Road, Gem",
  rating: 4.3,
  reviews: [],
  website: "https://somi-example.com",
  phoneNumber: "+1234997390",
  openHours: "Tue-Sun: 11:00 AM - 10:00 PM",
  priceRange: "$$ (11-30)",
  reservationsNeeded: false,
  isDeliveryAvailable: true,
  menuUrl: "https://somi-example.com/menu",
  photos: [
    "https://example.com/somi-photo1.jpg",
    "https://example.com/somi-photo2.jpg",
  ],
};
*/

// 2

const newRestaurant = {
  name: "Yo China",
  cuisine: ["Chinese", "Italian"],
  location: "MG Road, Bangalore",
  rating: 3.9,
  reviews: [],
  website: "https://yo-example.com",
  phoneNumber: "+1288997392",
  openHours: "Tue-Sun: 10:00 AM - 11:00 PM",
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isDeliveryAvailable: false,
  menuUrl: "https://yo-example.com/menu",
  photos: [
    "https://example.com/yo-photo1.jpg",
    "https://example.com/yo-photo2.jpg",
    "https://example.com/yo-photo3.jpg",
  ],
};

// Create a new restaurant entry in the database

async function createRestaurant(newRestaurant) {
  try {
    const restaurant = new Restaurant(newRestaurant);
    const saveRestaurant = await restaurant.save();
    console.log("New Restaurant data:", saveRestaurant);
  } catch (error) {
    throw error;
  }
}

// 3
async function getAllRestaurants() {
  try {
    const restaurants = await Restaurant.find();
    console.log("All Restaurants:", restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
}

// 4
async function getRestaurantByName(name) {
  try {
    const restaurant = await Restaurant.findOne({ name });
    console.log(`Restaurant with name '${name}':`, restaurant);
  } catch (error) {
    console.error("Error fetching restaurant by name:", error);
  }
}

// 5
async function getRestaurantsWithReservations() {
  try {
    const restaurants = await Restaurant.find({ reservationsNeeded: true });
    console.log("Restaurants offering reservations:", restaurants);
  } catch (error) {
    console.error("Error fetching restaurants with reservations:", error);
  }
}

// 6
async function getRestaurantsWithDelivery() {
  try {
    const restaurants = await Restaurant.find({ isDeliveryAvailable: true });
    console.log("Restaurants offering delivery:", restaurants);
  } catch (error) {
    console.error("Error fetching restaurants with delivery:", error);
  }
}

// 7
async function getRestaurantByPhone(phoneNumber) {
  try {
    const restaurant = await Restaurant.findOne({ phoneNumber });
    console.log(`Restaurant with phone '${phoneNumber}':`, restaurant);
  } catch (error) {
    console.error("Error fetching restaurant by phone:", error);
  }
}

// 8
async function getRestaurantsByCuisine(cuisineName) {
  try {
    const restaurants = await Restaurant.find({ cuisine: cuisineName });
    console.log(`Restaurants with cuisine '${cuisineName}':`, restaurants);
  } catch (error) {
    console.error("Error fetching restaurants by cuisine:", error);
  }
}

// createRestaurant(newRestaurant);
// getAllRestaurants();
// getRestaurantByName("Yo China");
// getRestaurantsWithReservations();
// getRestaurantsWithDelivery();
// getRestaurantByPhone("+1288997392");
getRestaurantsByCuisine("Italian");
