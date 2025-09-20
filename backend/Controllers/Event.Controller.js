import Event from "../Models/Event.Model.js";

const CreateEvent = async (req, res) => {
  try {
    const { title, description, date, location, capacity } = req.body;

    if (!title || !description || !date || !location || !capacity) {
      return res.status(400).json({ status: 400, message: "Enter all fields" });
    }

    // Use logged-in user from ProtectRoutes middleware
    const organizer = req.user._id;

    const event = new Event({
      title,
      description,
      date,
      location,
      capacity,
      organizer, // automatically set
    });

    await event.save();
    return res.status(201).json({
      status: 201,
      message: "Event created successfully",
      data: event
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const GetEvents = async (req, res) => {
  try {
    const { organizer } = req.query;

    let events;
    if (organizer) {
      events = await Event.find({ organizer }).populate("organizer participants", "username email");
    } else {
      events = await Event.find().populate("organizer participants", "username email");
    }

    res.status(200).json({ status: 200, data: events });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const GetSingleEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id)
      .populate("organizer", "username email")
      .populate("participants", "username email");

    if (!event) {
      return res.status(404).json({ status: 404, message: "Event not found" });
    }

    return res.status(200).json({ status: 200, data: event });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const GetEventParticipants = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id).populate("participants", "username email");
    if (!event) {
      return res.status(404).json({ status: 404, message: "Event not found" });
    }

    return res.status(200).json({
      status: 200,
      event: { id: event._id, title: event.title },
      participants: event.participants
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const UpdateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const event = await Event.findByIdAndUpdate(id, { $set: updates }, { new: true });
    if (!event) {
      return res.status(404).json({ status: 404, message: "Event not found" });
    }

    res.status(200).json({ status: 200, message: "Event updated successfully", data: event });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const DeleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ status: 404, message: "Event not found" });
    }

    res.status(200).json({ status: 200, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export {
  CreateEvent,
  GetEvents,
  GetSingleEvent,
  GetEventParticipants,
  UpdateEvent,
  DeleteEvent
};
