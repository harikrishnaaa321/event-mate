import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/event");
        setEvents(res.data.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to fetch events");
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>All Events</h2>
      <Link to="/create-event">Create New Event</Link>
      <Link to="/book-ticket">book a ticket</Link>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <Link to={`/event/${event._id}`}>{event.title}</Link> - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
