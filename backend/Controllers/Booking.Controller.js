import Ticket from "../Models/Ticket.Model.js";
import Event from "../Models/Event.Model.js";
const BookTicket = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    if (!eventId || !userId) {
      return res.status(400).json({ status: 400, message: "Event and User are required" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ status: 404, message: "Event not found" });
    }

    const bookedCount = await Ticket.countDocuments({ event: eventId, status: "booked" });
    if (bookedCount >= event.capacity) {
      return res.status(400).json({ status: 400, message: "Event is fully booked" });
    }

    const existingTicket = await Ticket.findOne({ event: eventId, user: userId, status: "booked" });
    if (existingTicket) {
      return res.status(400).json({ status: 400, message: "You already booked this event" });
    }

    const ticket = new Ticket({ event: eventId, user: userId });
    await ticket.save();

    event.participants.push(userId);
    await event.save();

    return res.status(201).json({ status: 201, message: "Ticket booked successfully", data: ticket });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const GetTickets = async (req, res) => {
  try {
    const { userId } = req.query;

    let tickets;
    if (userId) {
      tickets = await Ticket.find({ user: userId }).populate("event user", "title email username");
    } else {
      tickets = await Ticket.find().populate("event user", "title email username");
    }

    return res.status(200).json({ status: 200, data: tickets });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const UpdateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["booked", "cancelled"].includes(status)) {
      return res.status(400).json({ status: 400, message: "Invalid status" });
    }

    const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
    if (!ticket) {
      return res.status(404).json({ status: 404, message: "Ticket not found" });
    }

    if (status === "cancelled") {
      await Event.findByIdAndUpdate(ticket.event, { $pull: { participants: ticket.user } });
    }

    return res.status(200).json({ status: 200, message: "Ticket updated successfully", data: ticket });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const DeleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndDelete(id);

    if (!ticket) {
      return res.status(404).json({ status: 404, message: "Ticket not found" });
    }

    await Event.findByIdAndUpdate(ticket.event, { $pull: { participants: ticket.user } });

    return res.status(200).json({ status: 200, message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export { BookTicket, GetTickets, UpdateTicket, DeleteTicket };
