const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB;

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:",error)
    });
