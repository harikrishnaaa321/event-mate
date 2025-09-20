import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

const DashboardPage = () => {
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const eventsRes = await API.get("/event");
        setEvents(eventsRes.data.data);

        const ticketsRes = await API.get("/tickets");
        setTickets(ticketsRes.data.data);

        // optional: fetch user info from /auth/me endpoint
        const userRes = await API.get("/auth/me");
        setUser(userRes.data.data);
      } catch (err) {
        alert("Error fetching dashboard data");
        navigate("/login");
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <header>
        <h1>EventMate Dashboard</h1>
        <nav>
          <Link to="/events">Events</Link>
          <Link to="/create-event">Create Event</Link>
          <Link to="/tickets">Tickets</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>

      <main>
        <section className="greeting">
          <h2>Welcome, {user?.username || "User"}!</h2>
        </section>

        <section className="overview">
          <div className="card">
            <h3>Total Events</h3>
            <p>{events.length}</p>
          </div>
          <div className="card">
            <h3>Total Tickets</h3>
            <p>{tickets.length}</p>
          </div>
        </section>

        <section className="upcoming-events">
          <h2>Upcoming Events</h2>
          <ul>
            {events.slice(0, 5).map((event) => (
              <li key={event._id}>
                <strong>{event.title}</strong> - {new Date(event.date).toLocaleDateString()} at {event.location}
                <span>Participants: {event.participants.length}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="quick-actions">
          <Link to="/create-event" className="button">Create Event</Link>
          <Link to="/tickets" className="button">View Tickets</Link>
        </section>
      </main>

      <footer>
        <p>© 2025 EventMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
