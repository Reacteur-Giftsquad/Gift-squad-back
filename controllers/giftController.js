const cloudinary = require("cloudinary").v2;
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
const sendFiles = require("../util/sendFiles");
const create = async (req, res, next) => {
  try {
    let image_url = "";
    if (req.files?.image) {
      image_url = await sendFiles(req.files.image);
    }

    const gift = await createGift({
      name: req.fields.name,
      price: Number(req.fields.price),
      link: req.fields.link || "",
      image_url,
      event: req.fields.event,
      owner: req.fields.owner,
      description: req.fields.description || "",
    });
    return res.status(201).json(gift);
  } catch (error) {
    next(error);
  }
};

const modify = async (req, res, next) => {
  try {
    const data = req.fields;

    let image_url = "";
    if (req.files?.image) {
      image_url = await sendFiles(req.files.image);
    }

    const giftData = {
      name: data.name,
      price: Number(data.price),
      link: data.link || "",
      image_url,
      description: data.description || "",
    };
    const gift = await modifyGift(req.params.id, giftData);
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
