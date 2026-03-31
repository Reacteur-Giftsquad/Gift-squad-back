const express = require("express");
const router = express.Router();
const {
  create,
  modify,
  getOne,
  getAll,
  remove,
  reserve,
  unreserve,
  getByEvent,
} = require("../controllers/giftController");

router.post("/gift/create", create);
router.put("/gift/modify/:id", modify);
router.get("/gift/:id", getOne);
router.get("/gift/", getAll);
router.delete("/gift/:id", remove);
router.post("/gift/:id/reserve", reserve);
router.post("/gift/:id/unreserve", unreserve);
router.get("/gift/event/:eventId", getByEvent);

module.exports = router;
