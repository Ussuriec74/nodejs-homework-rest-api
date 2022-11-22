const contacts = require('../servises/contactsServis');
const { createError } = require('../helpers');

const listContacts = async (req, res, next) => {
  const { _id: userId } = req.user;
  const allContacts = await contacts.getAllContact(req.query, userId);

    return res.json( allContacts );
}

const getContactById = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await contacts.getById(contactId, userId).catch((err) => {
    console.error(err);
    return null;
  });

  if (contact) {
    return res.json( contact );
  }
  return next(createError(404, "Not found"));
}

const addContact = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const createdContact = await contacts.createContact(req.body, userId);
    return res.status(201).json( createdContact );
  } catch (err) {
    if (err.message.includes('duplicate')) {
      err.status = 400;
    }
    next(err);
  }
}

const removeContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await contacts.deleteById(contactId, userId).catch((err) => {
    console.error(err);
    return null;
  });
  if (contact) {
    return res.status(204).json(contact);
  }
  return next(createError(404, "Not found"));
}


const updateContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await contacts.updateById(contactId, req.body, userId).catch((err) => {
    console.error(err);
    return null;
  });
  if (contact) {
    return res.json(contact);
  }
  return next(createError(404, "Not found"));
}

const updateStatusContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  if (!req.body) {
    return next(createError(400, "missing field favorite"));
  }
  const contact = await contacts.updateById(contactId, req.body, userId).catch((err) => {
    console.error(err);
    return null;
  });
  if (contact) {
    return res.json(contact);
  }
  return next(createError(404, "Not found"));
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};