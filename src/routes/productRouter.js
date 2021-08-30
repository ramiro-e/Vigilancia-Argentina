const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController.js');

router.get('/search/:id?', function(req,res){console.log(req.params.search)})

module.exports = router;
