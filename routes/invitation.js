const express = require("express");
const router = express.Router();
const {
  send,
  getAll,
  accept,
  refuse,
} = require("../controllers/invitationController");

router.post("/invitation/send", send);
router.get("/invitation/:userId", getAll);
router.post("/invitation/:id/accept", accept);
router.post("/invitation/:id/refuse", refuse);

module.exports = router;
