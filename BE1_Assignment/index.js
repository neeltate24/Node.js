const { initializeDatabase } = require("./db/db.connect");

const fs = require("fs");

const Car = require("./models/car.model");

initializeDatabase();

// Reading the JSON file

const jsonData = fs.readFileSync("cars.json", "utf-8");
const carsData = JSON.parse(jsonData);

// Inserting data into the database

function seedData() {
  try {
    for (const carData of carsData) {
      const newCar = new Car({
        brand: carData.brand,
        model: carData.model,
        year: carData.year,
        bodyStyle: carData.bodyStyle,
        fuelType: carData.fuelType,
        transmission: carData.transmission,
        engine: carData.engine,
        mileage: carData.mileage,
        color: carData.color,
        price: carData.price,
        condition: carData.condition,
        description: carData.description,
        photos: carData.photos,
        inMarket: carData.inMarket,
      });
      //   console.log(newCar);
      newCar.save();
    }
    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding the data:", error);
  }
}

seedData();
