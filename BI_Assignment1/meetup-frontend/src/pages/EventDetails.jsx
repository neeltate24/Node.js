import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { EVENTS_API } from "../api/events";
import Navbar from "../components/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, loading, error } = useFetch(`${EVENTS_API}/${id}`);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-8">
            <h2 className="fw-bold">{event.title}</h2>
            <p className="text-muted">
              Hosted By: <strong>{event.hostedBy}</strong>
            </p>

            <img
              src={event.image}
              alt={event.title}
              className="img-fluid rounded mb-4"
              style={{ maxWidth: "600px", width: "100%" }}
            />

            <h5 className="fw-bold">Details</h5>
            <p>{event.description}</p>

            <h6 className="fw-bold mt-4">Additional Information</h6>
            <p>
              <strong>Dress Code:</strong> {event.dressCode}
            </p>
            <p>
              <strong>Age Restrictions:</strong> {event.ageRestriction}
            </p>

            <h6 className="fw-bold mt-4">Event Tags</h6>
            {event.tags.map((tag, index) => (
              <span key={index} className="badge bg-danger me-2">
                {tag}
              </span>
            ))}
          </div>

          {/* Right Section */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <p>
                  <i
                    className="bi bi-calendar-event me-2"
                    style={{ color: "#000" }}
                  ></i>
                  {event.date}
                </p>
                <p>
                  <i className="bi bi-clock me-2" style={{ color: "#000" }}></i>
                  {event.time}
                </p>
                <p>
                  <i
                    className="bi bi-geo-alt me-2"
                    style={{ color: "#000" }}
                  ></i>
                  {event.venue}
                </p>
                <p>{event.address}</p>
                <p className="fw-bold">₹ {event.price}</p>
              </div>
            </div>

            <h6 className="fw-bold">Speakers ({event.speakers.length})</h6>
            {event.speakers.map((speaker) => (
              <div key={speaker._id} className="card mb-2 border-0 shadow-sm">
                <div className="card-body d-flex align-items-center">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="rounded-circle me-3"
                    width="50"
                    height="50"
                  />
                  <div>
                    <p className="mb-0 fw-bold">{speaker.name}</p>
                    <small className="text-muted">{speaker.role}</small>
                  </div>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center">
              <button className="btn btn-danger w-50 mt-3" disabled>
                RSVP
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
