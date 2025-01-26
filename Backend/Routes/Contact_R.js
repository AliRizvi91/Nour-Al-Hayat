const express = require('express')
const Contact_R = express.Router();

const {
    getAllContacts,
    getContact,
    addContact,
    updateContact,
    deleteContact
  } = require('../Controllers/Contact_C')

  Contact_R.route('/')
  .get(getAllContacts)
  .post(addContact)


  Contact_R.route('/:id')
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact)

module.exports = Contact_R


