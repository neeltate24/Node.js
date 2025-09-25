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

// createHotel(newHotel);

async function updateHotelById(hotelId, dataToUpdate) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      dataToUpdate,
      { new: true } // return updated document
    );
    console.log("Updated Hotel by ID:", updatedHotel);
  } catch (error) {
    console.log("Error in updating hotel by ID:", error);
  }
}

// updateHotelById("68d1413a292a2103402a0aeb", { checkOutTime: "11 AM" });

async function updateHotelByName(hotelName, dataToUpdate) {
  try {
    const updatedHotel = await Hotel.findOneAndUpdate(
      { name: hotelName },
      dataToUpdate,
      { new: true }
    );
    console.log("Updated Hotel by Name:", updatedHotel);
  } catch (error) {
    console.log("Error in updating hotel by name:", error);
  }
}

// updateHotelByName("Sunset Resort", { rating: 4.2 });

async function updateHotelByPhone(phoneNumber, dataToUpdate) {
  try {
    const updatedHotel = await Hotel.findOneAndUpdate(
      { phoneNumber: phoneNumber },
      dataToUpdate,
      { new: true }
    );
    console.log("Updated Hotel by Phone:", updatedHotel);
  } catch (error) {
    console.log("Error in updating hotel by phone:", error);
  }
}

// updateHotelByPhone("+1299655890", { phoneNumber: "+1997687392" });

// 1

async function deleteHotelById(hotelId) {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    console.log("Deleted hotel by id:", deletedHotel);
  } catch (error) {
    console.log("Error in deleting hotel by id:", error);
  }
}

// deleteHotelById("68cc3c64d9cf5ddec42bdfe2");

// 2

async function deleteHotelByPhoneNumber(phoneNumber) {
  try {
    const deletedHotel = await Hotel.findOneAndDelete({ phoneNumber });
    console.log("Deleted hotel by phone number:", deletedHotel);
  } catch (error) {
    console.log("Error in deleting hotel by phone number:", error);
  }
}

// deleteHotelByPhoneNumber("+1234555890");
