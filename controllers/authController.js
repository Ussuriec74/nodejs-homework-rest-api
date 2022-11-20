const { User } = require('../models/userModel');
const { Conflict, Unauthorized } = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const { JWT_SECRET } = process.env;

const signupUser = async (req, res, next) => {
  const { email, password } = req.body;

  const url = await gravatar.url(`${email}`, {s: '100', r: 'x', d: 'retro'}, false);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ email, password: hashedPassword, avatarURL: url });
  try {
    await user.save();
  } catch(error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      throw new Conflict("Email in use");
    }
    throw error;
  }
  return res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    }
  });
}

const loginUser = async (req, res,) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Unauthorized("Email or password is wrong");
  }
  const token = await jwt.sign({ _id: user._id }, JWT_SECRET, {
    expiresIn: "30m",
  });
  return res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    }
  });
}

const getCurrentUser = async (req, res, next) => {
  const { user } = req;
  const currentUser = await User.findOne(user._id);

  return res.json({
    email: currentUser.email,
    subscription: currentUser.subscription,
  });
}

const logoutUser = async (req, res, next) => {

  const { user } = req;
  user.token = null;

  await User.findByIdAndUpdate(user._id, user);

  return res.sendStatus(204);
}

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};
