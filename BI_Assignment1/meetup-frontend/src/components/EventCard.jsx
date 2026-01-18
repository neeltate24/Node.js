import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm border-0 rounded-4">
        {/* Event Image */}
        <img
          src={event.image}
          alt={event.title}
          className="card-img-top rounded-top-4"
          style={{ height: "200px", objectFit: "cover" }}
        />

        {/* Card Body */}
        <div className="card-body">
          {/* Event Type */}
          <span className="badge bg-light text-dark mb-2">
            {event.eventType} Event
          </span>

          {/* Date & Time */}
          <p className="text-muted small mb-1">
            {event.date} • {event.time}
          </p>

          {/* Title (Clickable) */}
          <Link
            to={`/events/${event._id}`}
            className="text-decoration-none text-dark"
          >
            <h5 className="fw-bold">{event.title}</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
