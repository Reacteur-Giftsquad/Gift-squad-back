const mongoose = require("mongoose");

const User = mongoose.model("User", {
  firstname: String,
  lastname: String,
  pseudo: {
    type: String,
    unique: true,
    required: true,
  },
  avatar_url: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  birthdate: Date,
  token: String,
  pushToken: String,
  hash: String,
  salt: String,
});

module.exports = User;
