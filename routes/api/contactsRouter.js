const express = require('express');
const contactController = require('../../controllers/contactController');
const { tryCatchWrapper } = require('../../helpers/index');
const { schemaPatch, schemaCreate } = require('../../models/contactModel');
const { validateRequest } = require('../../middlewares/validateRequest');
const { auth } = require('../../middlewares/auth');

const contactsRouter = express.Router();

contactsRouter.get("/", tryCatchWrapper(auth), tryCatchWrapper(contactController.listContacts));
contactsRouter.get("/:id", tryCatchWrapper(contactController.getContactById));
contactsRouter.post("/", tryCatchWrapper(auth),validateRequest(schemaCreate), tryCatchWrapper(contactController.addContact));
contactsRouter.delete("/:id", tryCatchWrapper(auth),tryCatchWrapper(contactController.removeContact));
contactsRouter.put("/:id", tryCatchWrapper(auth),validateRequest(schemaCreate), tryCatchWrapper(contactController.updateContact));
contactsRouter.patch("/:id/favorite", tryCatchWrapper(auth),validateRequest(schemaPatch), tryCatchWrapper(contactController.updateStatusContact));

module.exports = contactsRouter ;
