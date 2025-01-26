const express = require('express')
const Province_R = express.Router();

const {
    getAllProvinces,
    getProvince,
    addProvince,
    updateProvince,
    deleteProvince
  } = require('../Controllers/Province_C')

  Province_R.route('/')
  .get(getAllProvinces)
  .post(addProvince)


  Province_R.route('/:id')
  .get(getProvince)
  .put(updateProvince)
  .delete(deleteProvince)

module.exports = Province_R


