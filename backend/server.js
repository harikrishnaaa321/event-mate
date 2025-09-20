import express from "express";
import dotenv from "dotenv";
import connectToDB from "./utils/ConnectToDB.js";
import AuthRoutes from './Routes/Auth.Routes.js';
import EventRoutes from './Routes/Event.Routes.js';
import TicketRoutes from './Routes/Ticket.Routes.js';
import ProtectRoutes from "./utils/ProtectRoutes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allow frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // your React frontend URL
  credentials: true, // allow cookies to be sent
}));
// Routes
app.use('/api/auth', AuthRoutes); // auth routes don't require protection
app.use('/api/event', ProtectRoutes, EventRoutes); // protected routes
app.use('/api/tickets', ProtectRoutes, TicketRoutes); // protected routes

// Start server and connect to DB
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDB();
});
