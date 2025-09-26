const { initializeDatabase } = require("./db/db.connect");

const Car = require("./models/car.model");

initializeDatabase();

// 1

/*
const carData = {
  brand: "Ford",
  model: "Mustang",
  year: 2019,
  bodyStyle: "Convertible",
  fuelType: "Gasoline",
  transmission: "Automatic",
  engine: "5.0L V8",
  mileage: 25000,
  color: "Red",
  price: 3500000,
  condition: "Used",
  description: "Exciting Ford Mustang convertible with powerful V8 engine.",
  photos: [
    "https://example.com/mustang-photo1.jpg",
    "https://example.com/mustang-photo2.jpg",
    "https://example.com/mustang-photo3.jpg",
  ],
};
*/

// 2

const carData = {
  brand: "Honda",
  model: "Civic",
  year: 2018,
  bodyStyle: "Coupe",
  fuelType: "Gasoline",
  transmission: "Manual",
  engine: "1.5L Turbocharged Inline-4",
  mileage: 40000,
  color: "Black",
  price: 1800000,
  condition: "Used",
  description: "Sporty Civic coupe with low mileage and manual transmission.",
  photos: [
    "https://example.com/civic-photo1.jpg",
    "https://example.com/civic-photo2.jpg",
    "https://example.com/civic-photo3.jpg",
  ],
};

// Create a new car
async function createCar(carData) {
  try {
    const car = new Car(carData);
    const savedCar = await car.save();
    console.log("New Car created:", savedCar);
  } catch (error) {
    console.log("Error in creating car:", error);
  }
}

// 3
async function getAllCars() {
  try {
    const cars = await Car.find();
    console.log("All Cars:", cars);
  } catch (error) {
    console.log("Error in reading all cars:", error);
  }
}

// 4
async function getCarsByBrand(brand) {
  try {
    const cars = await Car.find({ brand });
    console.log(`Cars with brand ${brand}:`, cars);
  } catch (error) {
    console.log("Error in reading cars by brand:", error);
  }
}

// 5
async function getCarsByColor(color) {
  try {
    const cars = await Car.find({ color });
    console.log(`Cars with color ${color}:`, cars);
  } catch (error) {
    console.log("Error in reading cars by color:", error);
  }
}

// 6
async function updateCarPriceByModel(model, newPrice) {
  try {
    const updatedCar = await Car.findOneAndUpdate(
      { model },
      { price: newPrice },
      { new: true }
    );
    console.log(`Updated Car price for ${model}:`, updatedCar);
  } catch (error) {
    console.log("Error in updating car price:", error);
  }
}

// 7
async function updateCarConditionByModel(model, newCondition) {
  try {
    const updatedCar = await Car.findOneAndUpdate(
      { model },
      { condition: newCondition },
      { new: true }
    );
    console.log(`Updated Car condition for ${model}:`, updatedCar);
  } catch (error) {
    console.log("Error in updating car condition:", error);
  }
}

// 8
async function deleteCarById(carId) {
  try {
    const deletedCar = await Car.findByIdAndDelete(carId);
    console.log("Deleted Car by ID:", deletedCar);
  } catch (error) {
    console.log("Error in deleting car by ID:", error);
  }
}

// 9
async function deleteCarByBodyStyle(bodyStyle) {
  try {
    const deletedCar = await Car.findOneAndDelete({ bodyStyle });
    console.log(`Deleted Car with body style ${bodyStyle}:`, deletedCar);
  } catch (error) {
    console.log("Error in deleting car by body style:", error);
  }
}

// createCar(carData);
// getAllCars();
// getCarsByBrand("Ford");
// getCarsByColor("Black");
// updateCarPriceByModel("Corolla", 2300000);
// updateCarConditionByModel("Model S", "Used");
// deleteCarById("68cc0dbf4182e1267cdeb22a");
// deleteCarByBodyStyle("Coupe");
