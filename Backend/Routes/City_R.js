const express = require('express')
const City_R = express.Router();

const {
    getAllCities,
    getCity,
    addCity,
    updateCity,
    deleteCity
  } = require('../Controllers/City_C')

  City_R.route('/')
  .get(getAllCities)
  .post(addCity)


  City_R.route('/:id')
  .get(getCity)
  .put(updateCity)
  .delete(deleteCity)

module.exports = City_R


