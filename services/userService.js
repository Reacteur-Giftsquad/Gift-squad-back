const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

const createUser = async (data) => {
  const password = data.password;
  const salt = uid2(16);
  const hash = SHA256(password + salt).toString(encBase64);
  const token = uid2(64);

  const user = await User.create({
    email: data.email,
    firstname: data.firstname,
    lastname: data.lastname,
    pseudo: data.pseudo,
    birthdate: data.birthdate,
    token: token,
    hash: hash,
    salt: salt,
  });

  return {
    token: user.token,
  };
};

const logUser = async (data) => {
  const email = data.email;
  const password = data.password;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw { message: "Unauthorized" };
  }

  const hash = SHA256(password + user.salt).toString(encBase64);

  if (hash !== user.hash) {
    throw { message: "Unauthorized" };
  } else {
    return {
      message: {
        token: user.token,
      },
    };
  }
};

module.exports = {
  createUser,
  logUser,
};
