const { Contact } = require('../models/contactModel');


const getAllContact = async (query) => {
  const { limit, page } = query;
  const skip = (page - 1) * limit;

  return Contact.find().skip(skip).limit(limit).populate("owner", { email: 1 });
}

const getById = async (id) => {
  return Contact.findById(id);
}

const createContact = async (contact, id) => {
  return Contact.create({ ...contact, owner: id });
}

const deleteById = async (id) => {
  return Contact.findByIdAndDelete(id);
}

const updateById = async (id, contact) => {
  return Contact.findByIdAndUpdate(id, contact, { new: true });
}


module.exports = {
  getAllContact,
  getById,
  createContact,
  deleteById,
  updateById,
}