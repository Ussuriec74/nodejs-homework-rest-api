const express = require('express');
const Joi = require('joi');
const contacts = require('../../models/contacts');
const { createError } = require('../../error');

const contactsRouter = express.Router();

const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
    .required(),
  phone: Joi.string()
    .min(5)
    .max(15)
    .required(),
})

contactsRouter.get('/', async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    console.log(contacts);
    res.json(allContacts);
  } catch (err) {
    next(err);
  }
});

contactsRouter.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(req.params);
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
});

contactsRouter.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { name, email, phone } = req.body;
    const contact = await contacts.addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
});

contactsRouter.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.removeContact(contactId);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.status(204).json();
  } catch (err) {
    next(err);
  }
});

contactsRouter.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { name, email, phone } = req.body;
    const { contactId } = req.params;
    const contact = await contacts.updateContact(contactId, name, email, phone);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.json(contact);
  } catch(err) {
    next(err);
  }
});

module.exports = contactsRouter;

