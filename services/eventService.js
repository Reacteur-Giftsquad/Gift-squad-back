const Event = require("../models/Event");

const createEvent = async (data) => {
  const event = await Event.create({
    name: data.name,
    type: data.type,
    date: data.date,
    budget: data.budget,
    creator: data.creator,
    members: [{ user: data.creator }],
  });
  return event;
};

const modifyEvent = async (id, data) => {
  const event = await Event.findByIdAndUpdate(id, data, { new: true });
  return event;
};

const getEvents = async (userId) => {
  const events = await Event.find({ "members.user": userId });
  return events;
};

const getEventById = async (id) => {
  const event = await Event.findById(id)
    .populate("members.user")
    .populate("secret_Santa_Draw.giver")
    .populate("secret_Santa_Draw.receiver")
    .populate("creator");
  return event;
};

const deleteEvent = async (id) => {
  await Event.findByIdAndDelete(id);
};

const removeUser = async (eventId, userId) => {
  const event = await Event.findByIdAndUpdate(
    eventId,
    { $pull: { members: { user: userId } } },
    { new: true },
  );
  return event;
};

const drawSecretSanta = async (id) => {
  const event = await Event.findById(id);
  const members = event.members.map((m) => m.user.toString());
  if (members.length < 2) throw { message: "Not enough members" };

  let shuffled = [...members];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  event.secret_Santa_Draw = members.map((giver, i) => ({
    giver,
    receiver:
      shuffled[i] === giver ? shuffled[(i + 1) % shuffled.length] : shuffled[i],
  }));
  event.status = "drawn";
  await event.save();
  return event;
};

module.exports = {
  createEvent,
  modifyEvent,
  getEvents,
  getEventById,
  deleteEvent,
  removeUser,
  drawSecretSanta,
};
