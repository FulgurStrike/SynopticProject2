const express = require('express');
const router = express.Router();
const shopController = require('../controllers/ShopController');


router.get('/cropShop', shopController.renderCropShopPage);

router.get('/api/shopData', shopController.getShopData);
router.post('/api/addItem', shopController.addItem);
router.post('/api/removeItem', shopController.removeItem);
router.post('/api/updateQuantity', shopController.updateQuantity);
module.exports = router;
