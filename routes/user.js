const express = require("express");

const router = express.Router();
const { signup, login } = require("../controllers/userController");
const {
  signup,
  login,
  getUser,
  modify,
} = require("../controllers/userController");

router.post("/user/signup", signup);

router.post("/user/login", login);

module.exports = router;

router.get("/user/:id", getUser);

router.put("/user/modify/:id", modify);
