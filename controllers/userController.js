const { createUser, logUser } = require("../services/userService");

const signup = async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);

    return res.status(201).json(newUser);
  } catch (error) {
    if (error.message.includes("email_1 dup key")) {
      return res.status(400).json({
        message: "There is already an account associated to this email",
      });
    } else {
      next(error);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const result = await logUser(req.body);

    return res.json(result.message);
  } catch (error) {
    if (error.message.includes("Unauthorized")) {
      return res.status(401).json(error.message);
    } else {
      next(error);
    }
  }
};

const {
  createUser,
  logUser,
  getUserById,
  modifyUser,
} = require("../services/userService");

const getUser = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

const modify = async (req, res, next) => {
  try {
    const user = await modifyUser(req.params.id, req.body);
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, getUser, modify };

module.exports = {
  signup,
  login,
};
