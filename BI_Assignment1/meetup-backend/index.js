const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const { initializeDatabase } = require("./db/db.connect");
const Event = require("./models/event.model");

initializeDatabase();

async function createEvent(newEvent) {
  try {
    const event = new Event(newEvent);
    return await event.save();
  } catch (error) {
    throw error;
  }
}

// Create a new event
app.post("/events", async (req, res) => {
  try {
    const savedEvent = await createEvent(req.body);
    res.status(201).json({
      message: "Event created successfully",
      event: savedEvent,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
});

async function readAllEvents() {
  try {
    return await Event.find();
  } catch (error) {
    throw error;
  }
}

app.get("/events", async (req, res) => {
  try {
    const events = await readAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

async function readEventById(eventId) {
  try {
    return await Event.findById(eventId);
  } catch (error) {
    throw error;
  }
}

app.get("/events/:id", async (req, res) => {
  try {
    const event = await readEventById(req.params.id);

    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// Delete event by ID
app.delete("/events/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
