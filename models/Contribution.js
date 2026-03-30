const mongoose = require("mongoose");

const Contribution = mongoose.model("Contribution", {
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: Number,
});

module.exports = Contribution;
