// giftRouter.js
const express = require('express');
const Gift_R = express.Router();
const { upload } = require('../middleware/multer.middleware');
const paymentIntegration = require('../Services/GiftStripe.js');

const {
    getAllGifts,
    getGift,
    addGift,
    updateGift,
    deleteGift
} = require('../Controllers/giftPackage_C');

Gift_R.route('/')
    .get(getAllGifts)
    .post(upload.array('giftImages', 4), addGift);

Gift_R.route('/:id')
    .get(getGift)
    .put(upload.array('giftImages', 4),updateGift)
    .delete(deleteGift);

Gift_R.route('/checkout')
    .post(paymentIntegration);

module.exports = Gift_R;
