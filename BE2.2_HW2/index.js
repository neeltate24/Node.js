const { initializeDatabase } = require("./db/db.connect");
const Hotel = require("./models/hotel.model");

initializeDatabase();

/*
const newHotel = {
  name: "New Hotel",
  category: "Mid-Range",
  location: "123 Main Street, Frazer Town",
  rating: 4.0,
  reviews: [],
  website: "https://hotel-example.com",
  phoneNumber: "+1234567890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Room Service"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: true,
  photos: [
    "https://example.com/hotel-photo1.jpg",
    "https://example.com/hotel-photo2.jpg",
  ],
};
*/

// 1

/*
const newHotel = {
  name: "Lake View",
  category: "Mid-Range",
  location: "124 Main Street, Anytown",
  rating: 3.2,
  reviews: [],
  website: "https://lake-view-example.com",
  phoneNumber: "+1234555890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Boating"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: false,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: false,
  photos: [
    "https://example.com/hotel1-photo1.jpg",
    "https://example.com/hotel1-photo2.jpg",
  ],
};
*/

// 2

const newHotel = {
  name: "Sunset Resort",
  category: "Resort",
  location: "12 Main Road, Anytown",
  rating: 4.0,
  reviews: [],
  website: "https://sunset-example.com",
  phoneNumber: "+1299655890",
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM",
  amenities: [
    "Room Service",
    "Horse riding",
    "Boating",
    "Kids Play Area",
    "Bar",
  ],
  priceRange: "$$$$ (61+)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: true,
  isSpaAvailable: true,
  isRestaurantAvailable: true,
  photos: [
    "https://example.com/hotel2-photo1.jpg",
    "https://example.com/hotel2-photo2.jpg",
  ],
};

async function createHotel(newHotel) {
  try {
    const hotel = new Hotel(newHotel);
    const savedHotel = await hotel.save();
    console.log("New Hotel data:", savedHotel);
  } catch (error) {
    console.error("Error creating hotel:", error);
  }
}

// 3

async function getAllHotels() {
  try {
    const hotels = await Hotel.find();
    console.log("All Hotels:", hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
}

async function getHotelByName(name) {
  try {
    const hotel = await Hotel.findOne({ name });
    console.log(`Hotel with name '${name}':`, hotel);
  } catch (error) {
    console.error("Error fetching hotel by name:", error);
  }
}

async function getHotelsWithParking() {
  try {
    const hotels = await Hotel.find({ isParkingAvailable: true });
    console.log("Hotels with parking:", hotels);
  } catch (error) {
    console.error("Error fetching hotels with parking:", error);
  }
}

async function getHotelsWithRestaurant() {
  try {
    const hotels = await Hotel.find({ isRestaurantAvailable: true });
    console.log("Hotels with restaurant:", hotels);
  } catch (error) {
    console.error("Error fetching hotels with restaurant:", error);
  }
}

async function getHotelsByCategory(category) {
  try {
    const hotels = await Hotel.find({ category });
    console.log(`Hotels in category '${category}':`, hotels);
  } catch (error) {
    console.error("Error fetching hotels by category:", error);
  }
}

async function getHotelsByPriceRange(priceRange) {
  try {
    const hotels = await Hotel.find({ priceRange });
    console.log(`Hotels with price range '${priceRange}':`, hotels);
  } catch (error) {
    console.error("Error fetching hotels by price range:", error);
  }
}

async function getHotelsByRating(rating) {
  try {
    const hotels = await Hotel.find({ rating });
    console.log(`Hotels with rating '${rating}':`, hotels);
  } catch (error) {
    console.error("Error fetching hotels by rating:", error);
  }
}

async function getHotelByPhone(phoneNumber) {
  try {
    const hotel = await Hotel.findOne({ phoneNumber });
    console.log(`Hotel with phone '${phoneNumber}':`, hotel);
  } catch (error) {
    console.error("Error fetching hotel by phone:", error);
  }
}

// createHotel(newHotel);
// getAllHotels();
// getHotelByName("Lake View");
// getHotelsWithParking();
// getHotelsWithRestaurant();
// getHotelsByCategory("Mid-Range");
// getHotelsByPriceRange("$$$$ (61+)");
// getHotelsByRating(4.0);
getHotelByPhone("+1299655890");
