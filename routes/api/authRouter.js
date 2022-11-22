const express = require('express');
const userController = require('../../controllers/userController');
const { tryCatchWrapper } = require('../../helpers/index');
const { schemaUserRegister, schemUserLogin } = require('../../models/userModel');
const { validateRequest } = require('../../middlewares/validateRequest');
const { auth, upload } = require('../../middlewares');

const usersRouter = express.Router();


usersRouter.post("/signup", validateRequest(schemaUserRegister), tryCatchWrapper(userController.signupUser));
usersRouter.post("/login", validateRequest(schemUserLogin), tryCatchWrapper(userController.loginUser));
usersRouter.get("/logout", tryCatchWrapper(auth), tryCatchWrapper(userController.logoutUser));
usersRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(userController.getCurrentUser));
usersRouter.patch("/avatars", tryCatchWrapper(auth), tryCatchWrapper(upload.single("avatar")), tryCatchWrapper(userController.cahgeAvatarUrl));

module.exports = usersRouter;