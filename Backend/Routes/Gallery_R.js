const express = require('express')
const Gallery_R = express.Router();
const {upload} = require('../middleware/multer.middleware')

const {
    getAllGallerys,
    getGallery,
    addGallery,
    updateGallery,
    deleteGallery
  } = require('../Controllers/Gallery_C')

  Gallery_R.route('/')
  .get(getAllGallerys)
  .post(upload.single('image'),addGallery)


  Gallery_R.route('/:id')
  .get(getGallery)
  .put(updateGallery)
  .delete(deleteGallery)

module.exports = Gallery_R


