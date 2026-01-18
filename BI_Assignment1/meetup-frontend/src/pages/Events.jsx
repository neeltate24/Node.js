import React, { useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import useFetch from "../hooks/useFetch";
import { EVENTS_API } from "../api/events";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState("Select Event Type");

  const { data: events, loading, error } = useFetch(EVENTS_API);

  const filteredEvents = events?.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesType =
      eventType === "Select Event Type" || event.eventType === eventType;

    return matchesSearch && matchesType;
  });

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Meetup Events</h2>

          {/* Event Type Filter */}
          <select
            className="form-select w-auto"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="Select Event Type">Select Event Type</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        {loading && <p>Loading events...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="row">
          {filteredEvents?.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
