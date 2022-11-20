const contacts = require('../servises/contactsServis');
const { createError } = require('../helpers');

const listContacts = async (req, res, next) => {
  const { _id } = req.user;
  console.log(_id);
  const allContacts = await contacts.getAllContact(req.query, _id);

    return res.json( allContacts );
}

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contacts.getById(id).catch((err) => {
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
    const _id = req.user;
    const createdContact = await contacts.createContact(req.body, _id);
    return res.status(201).json( createdContact );
  } catch (err) {
    if (err.message.includes('duplicate')) {
      err.status = 400;
    }
    next(err);
  }
}

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contacts.deleteById(id).catch((err) => {
    console.error(err);
    return null;
  });
  if (contact) {
    return res.status(204).json(contact);
  }
  return next(createError(404, "Not found"));
}


const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contacts.updateById(id, req.body).catch((err) => {
    console.error(err);
    return null;
  });
  if (contact) {
    return res.json(contact);
  }
  return next(createError(404, "Not found"));
}

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  if (!req.body) {
    return next(createError(400, "missing field favorite"));
  }
  const contact = await contacts.updateById(id, req.body).catch((err) => {
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