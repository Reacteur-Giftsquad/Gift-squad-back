const express = require("express");

const router = express.Router();
const { signup, login, getUser, modify } = require("../controllers/userController");

router.post("/user/signup", signup);
router.post("/user/login", login);
router.get("/user/:id", getUser);
router.put("/user/modify/:id", modify);

module.exports = router;
