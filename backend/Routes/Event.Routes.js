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


router.post("/", CreateEvent);

router.get("/", GetEvents);

router.get("/:id", GetSingleEvent);

router.get("/:id/participants", GetEventParticipants);

router.put("/:id", UpdateEvent);

router.delete("/:id", DeleteEvent);

export default router;
