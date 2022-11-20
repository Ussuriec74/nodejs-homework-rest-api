const { Schema, model } = require("mongoose");
const Joi = require('joi');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    index: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
  },
});

const User = model("user", userSchema);

const schemaUserRegister = Joi.object({
  password: Joi.string()
    .min(5)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
    .required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const schemUserLogin = Joi.object({
  password: Joi.string()
    .min(5)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
    .required(),
})

module.exports = { User, schemaUserRegister, schemUserLogin };