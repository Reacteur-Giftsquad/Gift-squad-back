const express = require("express");
const router = express.Router();
const {
  create,
  modify,
  getAll,
  getOne,
  remove,
  removeUserFromEvent,
  draw,
} = require("../controllers/eventController");

router.post("/events/create", create);
router.put("/events/modify/:id", modify);
router.get("/events/:userId", getAll);
router.get("/events/:id", getOne);
router.delete("/events/:id", remove);
router.post("/events/draw/:id", draw);
router.delete("/events/:id/remove-user/:userId", removeUserFromEvent);

module.exports = router;
