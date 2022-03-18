const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController.js');

router.get('/catalog', productController.catalog)
router.get('/catalog/filter', productController.filter)
router.get('/detail/:id', productController.detail)


module.exports = router;