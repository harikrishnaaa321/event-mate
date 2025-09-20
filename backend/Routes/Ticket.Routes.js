import express from "express";
import {
  BookTicket,
  GetTickets,
  UpdateTicket,
  DeleteTicket
} from "../Controllers/Ticket.Controller.js";

const router = express.Router();
router.post("/tickets", BookTicket);
router.get("/tickets", GetTickets);
router.put("/tickets/:id", UpdateTicket);
router.delete("/tickets/:id", DeleteTicket);

export default router;
