const mongoose = require("mongoose");

const Event = mongoose.model("Event", {
  name: String,
  type: String,
  date: Date,
  budget: Number,
  status: String,
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      invitation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invitation",
      },
    },
  ],
  secret_Santa_Draw: [
    {
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      giver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

module.exports = Event;
