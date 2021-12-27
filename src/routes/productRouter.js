const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController.js');

router.get('/detail/:id', productController.detail)


module.exports = router;