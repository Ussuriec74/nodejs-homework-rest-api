const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contactsRaw = await fs.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(contact => contact.id === contactId);
  return contact;
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const removedContact = allContacts.find((contact) => contact.id === contactId);
  if (!removeContact) {
    return null;
  }
  const newContactList = allContacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContactList));
  return removedContact;
}

const addContact = async ({name, email, phone}) => {
  const id = nanoid();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

const updateContact = async (contactId, name, email, phone) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(contact => contact.id === contactId);
  if (contactIndex !== -1) {
    allContacts[contactIndex].name = name;
    allContacts[contactIndex].email = email;
    allContacts[contactIndex].phone = phone;

    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return allContacts[contactIndex];
  } else {
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
