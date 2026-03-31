const {
  createGift,
  modifyGift,
  getGiftById,
  getAllGifts,
  deleteGift,
  reserveGift,
  unreserveGift,
  getGiftsByEvent,
} = require("../services/giftService");

const create = async (req, res, next) => {
  try {
    const gift = await createGift(req.body);
    return res.status(201).json(gift);
  } catch (error) {
    next(error);
  }
};

const modify = async (req, res, next) => {
  try {
    const gift = await modifyGift(req.params.id, req.body);
    return res.json(gift);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const gift = await getGiftById(req.params.id);
    return res.json(gift);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const gifts = await getAllGifts();
    return res.json(gifts);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await deleteGift(req.params.id);
    return res.json({ message: "Gift deleted" });
  } catch (error) {
    next(error);
  }
};

const reserve = async (req, res, next) => {
  try {
    const gift = await reserveGift(req.params.id, req.body.userId);
    return res.json(gift);
  } catch (error) {
    next(error);
  }
};

const unreserve = async (req, res, next) => {
  try {
    const gift = await unreserveGift(req.params.id);
    return res.json(gift);
  } catch (error) {
    next(error);
  }
};

const getByEvent = async (req, res, next) => {
  try {
    const gifts = await getGiftsByEvent(req.params.eventId);
    return res.json(gifts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  modify,
  getOne,
  getAll,
  remove,
  reserve,
  unreserve,
  getByEvent,
};
