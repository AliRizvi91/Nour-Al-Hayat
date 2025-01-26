const express = require('express')
const Feature_R = express.Router();
const {upload} = require('../middleware/multer.middleware')

const {
    getAllFeatures,
    getFeature,
    addFeature,
    updateFeature,
    deleteFeature
  } = require('../Controllers/Feature_C')

  Feature_R.route('/')
  .get(getAllFeatures)
  .post(upload.single('image'),addFeature)


  Feature_R.route('/:id')
  .get(getFeature)
  .put(updateFeature)
  .delete(deleteFeature)

module.exports = Feature_R


