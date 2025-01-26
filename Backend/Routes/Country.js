const express = require('express')
const Country_R = express.Router();

const {
    getAllCountries,
    getCountry,
    addCountry,
    updateCountry,
    deleteCountry
  } = require('../Controllers/Country_C')

  Country_R.route('/')
  .get(getAllCountries)
  .post(addCountry)


  Country_R.route('/:id')
  .get(getCountry)
  .put(updateCountry)
  .delete(deleteCountry)

module.exports = Country_R


