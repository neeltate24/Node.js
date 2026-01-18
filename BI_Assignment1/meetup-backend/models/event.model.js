const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
});

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    hostedBy: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
    },
    address: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    dressCode: {
      type: String,
    },
    ageRestriction: {
      type: String,
    },
    tags: [String],
    speakers: [speakerSchema],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
