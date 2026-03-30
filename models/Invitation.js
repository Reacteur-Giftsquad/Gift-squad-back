const mongoose = require("mongoose");

const Invitation = mongoose.model("Invitation", {
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: string,
    default: "pending",
  },
});

module.exports = Invitation;
