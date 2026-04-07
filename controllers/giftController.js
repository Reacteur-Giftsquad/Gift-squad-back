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

const create = async (req, res, next) => {
  try {
    console.log("Gift create - fields:", req.fields);
    console.log("Gift create - files:", req.files ? Object.keys(req.files) : "none");

    let image_url = "";
    if (req.files?.image) {
      console.log("Uploading image to Cloudinary:", req.files.image.path);
      const result = await cloudinary.uploader.upload(req.files.image.path, {
        folder: "gift-squad/gifts",
      });
      console.log("Cloudinary upload done:", result.secure_url);
      image_url = result.secure_url;
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
    console.log("Gift created:", gift._id);
    return res.status(201).json(gift);
  } catch (error) {
    console.log("Gift create error:", error.message || error);
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
