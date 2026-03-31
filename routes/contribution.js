const express = require("express");
const router = express.Router();
const { create, getByEvent } = require("../controllers/contributionController");

router.post("/contribution/create", create);
router.get("/contribution/event/:eventId", getByEvent);

module.exports = router;
