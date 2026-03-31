const Gift = require("../models/Gift");

const createGift = async (data) => {
  const gift = await Gift.create(data);
  return gift;
};

const modifyGift = async (id, data) => {
  const gift = await Gift.findByIdAndUpdate(id, data, { new: true });
  return gift;
};

const getGiftById = async (id) => {
  const gift = await Gift.findById(id);
  return gift;
};

const getAllGifts = async () => {
  const gifts = await Gift.find();
  return gifts;
};

const deleteGift = async (id) => {
  await Gift.findByIdAndDelete(id);
};

const reserveGift = async (id, userId) => {
  const gift = await Gift.findByIdAndUpdate(
    id,
    { isAssigned: true, assignedTo: userId },
    { new: true },
  );
  return gift;
};

const unreserveGift = async (id) => {
  const gift = await Gift.findByIdAndUpdate(
    id,
    { isAssigned: false, assignedTo: null },
    { new: true },
  );
  return gift;
};

const getGiftsByEvent = async (eventId) => {
  const gifts = await Gift.find({ event: eventId });
  return gifts;
};

module.exports = {
  createGift,
  modifyGift,
  getGiftById,
  getAllGifts,
  deleteGift,
  reserveGift,
  unreserveGift,
  getGiftsByEvent,
};
