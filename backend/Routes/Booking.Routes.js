import express from "express";
import {
  CreateEvent,
  GetEvents,
  GetSingleEvent,
  GetEventParticipants,
  UpdateEvent,
  DeleteEvent
} from "../Controllers/Event.Controller.js";

const router = express.Router();


router.post("/events", CreateEvent);

router.get("/events", GetEvents);

router.get("/events/:id", GetSingleEvent);

router.get("/events/:id/participants", GetEventParticipants);

router.put("/events/:id", UpdateEvent);

router.delete("/events/:id", DeleteEvent);

export default router;
