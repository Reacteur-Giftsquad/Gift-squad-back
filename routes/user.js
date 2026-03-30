const express = require("express");
const router = express.Router();

app.put("/user/signup", async (req, res) => {
  try {
    res.status(200).json({ message: "🦜" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
