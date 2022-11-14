const express = require('express');
const authController = require('../../controllers/authController');
const { tryCatchWrapper } = require('../../helpers/index');
const { schemaUserRegister, schemUserLogin } = require('../../models/userModel');
const { validateRequest } = require('../../middlewares/validateRequest');
const { auth } = require('../../middlewares/auth');

const usersRouter = express.Router();

usersRouter.post("/signup", validateRequest(schemaUserRegister), tryCatchWrapper(authController.signupUser));
usersRouter.post("/login", validateRequest(schemUserLogin), tryCatchWrapper(authController.loginUser));
usersRouter.post("/logout", tryCatchWrapper(auth), tryCatchWrapper(authController.logoutUser));
usersRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(authController.getCurrentUser));

module.exports = usersRouter;