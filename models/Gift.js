const mongoose = require("mongoose");

const Gift = mongoose.model("Gift", {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image_url: String,
  link: String,
  isAssigned: Boolean,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  descritption: String,
});

module.exports = Gift;
