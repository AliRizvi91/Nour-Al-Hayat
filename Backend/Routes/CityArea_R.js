const express = require('express')
const CityArea_R = express.Router();

const {
    getAllCityAreas,
    getCityArea,
    addCityArea,
    updateCityArea,
    deleteCityArea
  } = require('../Controllers/CityArea_C')

  CityArea_R.route('/')
  .get(getAllCityAreas)
  .post(addCityArea)


  CityArea_R.route('/:id')
  .get(getCityArea)
  .put(updateCityArea)
  .delete(deleteCityArea)

module.exports = CityArea_R


