const express = require('express');
const authController = require('../../controllers/authController');
const { tryCatchWrapper } = require('../../helpers/index');
const { schemaUserRegister, schemUserLogin } = require('../../models/userModel');
const { validateRequest } = require('../../middlewares/validateRequest');

const usersRouter = express.Router();

usersRouter.post("/signup", validateRequest(schemaUserRegister), tryCatchWrapper(authController.signupUser));
usersRouter.post("/signin", validateRequest(schemUserLogin), tryCatchWrapper(authController.signinUser));

module.exports = usersRouter;