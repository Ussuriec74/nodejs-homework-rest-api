const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {

  const { authorization = "" } = req.headers;
  const [tokenType, token] = authorization.split(" ");

  if (tokenType === "Bearer" && token) {
    try {
      const verifiedToken = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(verifiedToken._id);
      
      if (!user) {
        next(new Unauthorized("Not authorized"));
      }
      
      req.user = user;

      return next();

    } catch(error) {
      if (error.name === "TokenExpiredError") {
        next(new Unauthorized("Not authorized"));
      }
      if (error.name === "JsonWebTokenError") {
        next(new Unauthorized("Not authorized"));
      }

      throw error;
    }
  }

  return next(new Unauthorized("Not authorized"));
}

module.exports = { auth };