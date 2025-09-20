import { useState, useEffect } from "react";
import API from "../api/api";

const BookTicketPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/event", { withCredentials: true });
        setEvents(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch events");
      }
    };
    fetchEvents();
  }, []);

  const handleBook = async () => {
    if (!selectedEvent) return alert("Select an event to book");

    try {
      const res = await API.post(
        "/tickets",
        { event: selectedEvent },
        { withCredentials: true }
      );
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to book ticket");
    }
  };

  return (
    <div>
      <h2>Book Ticket</h2>
      <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
        <option value="">Select Event</option>
        {events.map((event) => (
          <option key={event._id} value={event._id}>
            {event.title} - {new Date(event.date).toLocaleDateString()}
          </option>
        ))}
      </select>
      <button onClick={handleBook}>Book Ticket</button>
    </div>
  );
};

export default BookTicketPage;
