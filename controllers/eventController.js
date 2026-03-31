const {
  createEvent,
  modifyEvent,
  getEvents,
  getEventById,
  deleteEvent,
  removeUser,
  drawSecretSanta,
} = require("../services/eventService");

const create = async (req, res, next) => {
  try {
    const event = await createEvent(req.body);
    return res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

const modify = async (req, res, next) => {
  try {
    const event = await modifyEvent(req.params.id, req.body);
    return res.json(event);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const events = await getEvents(req.params.userId);
    return res.json(events);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const event = await getEventById(req.params.id);
    return res.json(event);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await deleteEvent(req.params.id);
    return res.json({ message: "Event deleted" });
  } catch (error) {
    next(error);
  }
};

const removeUserFromEvent = async (req, res, next) => {
  try {
    const event = await removeUser(req.params.id, req.params.userId);
    return res.json(event);
  } catch (error) {
    next(error);
  }
};

const draw = async (req, res, next) => {
  try {
    const event = await drawSecretSanta(req.params.id);
    return res.json(event);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  modify,
  getAll,
  getOne,
  remove,
  removeUserFromEvent,
  draw,
};
