import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // attendees
    status: {
      type: String,
      enum: ["scheduled", "rescheduled", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);
export default Event;
