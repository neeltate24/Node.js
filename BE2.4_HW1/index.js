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

// createRestaurant(newRestaurant);

async function updateRestaurantById(restaurantId, dataToUpdate) {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      dataToUpdate,
      { new: true } // return updated document
    );
    console.log("Updated Restaurant by ID:", updatedRestaurant);
  } catch (error) {
    console.log("Error in updating restaurant by ID:", error);
  }
}

// updateRestaurantById("68cd1d6f3cf833afadd029d6", { rating: 4.1 });

async function updateRestaurantByName(restaurantName, dataToUpdate) {
  try {
    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { name: restaurantName },
      dataToUpdate,
      { new: true }
    );
    console.log("Updated Restaurant by Name:", updatedRestaurant);
  } catch (error) {
    console.log("Error in updating restaurant by name:", error);
  }
}

// updateRestaurantByName("Somi", { name: "Som Sarovar" });

async function updateRestaurantByPhone(phoneNumber, dataToUpdate) {
  try {
    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { phoneNumber: phoneNumber },
      dataToUpdate,
      { new: true }
    );
    console.log("Updated Restaurant by Phone:", updatedRestaurant);
  } catch (error) {
    console.log("Error in updating restaurant by phone:", error);
  }
}

// updateRestaurantByPhone("+1288997392", { isDeliveryAvailable: true });

// 2

async function deleteRestaurantById(restaurantId) {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    console.log("Deleted restaurant by id:", deletedRestaurant);
  } catch (error) {
    console.log("Error in deleting restaurant by id:", error);
  }
}

// deleteRestaurantById("68cd1d097867635f697f66dc");

// 2

async function deleteRestaurantByName(restaurantName) {
  try {
    const deletedRestaurant = await Restaurant.findOneAndDelete({
      name: restaurantName,
    });
    console.log("Deleted restaurant by name:", deletedRestaurant);
  } catch (error) {
    console.log("Error in deleting restaurant by name:", error);
  }
}

// deleteRestaurantByName("Yo China");
