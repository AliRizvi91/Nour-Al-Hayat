const express = require('express')
const Role_R = express.Router();

const {
    getAllRoles,
    getRole,
    addRole,
    updateRole,
    deleteRole
  } = require('../Controllers/Role_C')

  Role_R.route('/')
  .get(getAllRoles)
  .post(addRole)


  Role_R.route('/:id')
  .get(getRole)
  .put(updateRole)
  .delete(deleteRole)

module.exports = Role_R


