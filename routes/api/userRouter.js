const express = require('express');
const userController = require('../../controllers/userController');
const { tryCatchWrapper } = require('../../helpers/index');
const { schemaPatch, schemaCreate } = require('../../models/contactModel');
const { validateRequest } = require('../../middlewares/validateRequest');

const usersRouter = express.Router();

usersRouter.get("/", tryCatchWrapper(userController.listContacts));
usersRouter.get("/:id", tryCatchWrapper(userController.getContactById));
usersRouter.post("/", validateRequest(schemaCreate), tryCatchWrapper(userController.addContact));
usersRouter.delete("/:id", tryCatchWrapper(userController.removeContact));
usersRouter.put("/:id", validateRequest(schemaCreate), tryCatchWrapper(userController.updateContact));
usersRouter.patch("/:id/favorite", validateRequest(schemaPatch), tryCatchWrapper(userController.updateStatusContact));

module.exports = usersRouter ;