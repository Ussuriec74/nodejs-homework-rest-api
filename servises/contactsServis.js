const { Contact } = require('../models/contactModel');


const getAllContact = async (query, userId) => {
  const { limit, page } = query;
  const skip = (page - 1) * limit;

  return Contact.find({owner:userId}).skip(skip).limit(limit).populate("owner", { email: 1 });
}

const getById = async (contactId, userId) => {
  return Contact.findOne({_id: contactId, owner: userId});
}

const createContact = async (contact, userId) => {
  return Contact.create({ ...contact, owner: userId });
}

const deleteById = async (contactId, userId) => {
  return Contact.findOneAndRemove({_id: contactId, owner: userId});
}

const updateById = async (contactId, contact, userId) => {
  return Contact.findByIdAndUpdate({_id: contactId, owner: userId}, contact, { new: true });
}


module.exports = {
  getAllContact,
  getById,
  createContact,
  deleteById,
  updateById,
}