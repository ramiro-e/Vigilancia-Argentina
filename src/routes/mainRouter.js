const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController.js');

router.get('/', mainController.index)
router.get('/catalog', mainController.catalog)

module.exports = router;
