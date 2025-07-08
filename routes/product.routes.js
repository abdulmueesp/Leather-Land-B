const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/add', productController.addProduct);
router.get('/all', productController.getProducts);

module.exports = router; 