import express from "express";
import dotenv from "dotenv";
import connectToDB from "./utils/ConnectToDB.js";
import AuthRoutes from './Routes/Auth.Routes.js'
import EventRoutes from './Routes/Booking.Routes.js';
import TicketRoutes from './Routes/Ticket.Routes.js';
import ProtectRoutes from "./utils/ProtectRoutes.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use('/auth',AuthRoutes);
app.use('/api',ProtectRoutes,EventRoutes);
app.use('/api',ProtectRoutes,TicketRoutes);
app.listen(process.env.PORT, () => {
  console.log(`connected to sever on port ${process.env.PORT}`);
  connectToDB();
});
