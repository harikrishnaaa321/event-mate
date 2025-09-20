import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/event/${id}`);
        setEvent(res.data.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to fetch event");
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleString()}</p>
      <p>Location: {event.location}</p>
      <p>Capacity: {event.capacity}</p>
      <p>Organizer: {event.organizer.username}</p>
      <h3>Participants:</h3>
      <ul>
        {event.participants.map(p => (
          <li key={p._id}>{p.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetailPage;
