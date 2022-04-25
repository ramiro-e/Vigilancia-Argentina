const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const shoppingCartController = require('../controllers/shoppingCartController');
const userLogged = require('../middlewares/userLogged');

let validaciones = [body("quantity").custom((value) => value > 0).withMessage("Debe agregar almenos un producto a su carrito")];

router.get('/shoppingCart', userLogged, shoppingCartController.shoppingCart);
router.post('/shoppingCart/getItems', userLogged, shoppingCartController.getItems);
router.post('/shoppingCart/addItem', userLogged, validaciones, shoppingCartController.addItem);
router.post('/shoppingCart/deleteItem', userLogged, shoppingCartController.deleteItem);
router.post('/shoppingCart/changeQuantity', userLogged, shoppingCartController.changeQuantity);
router.post('/shoppingCart/purchaseItems', userLogged, shoppingCartController.purchaseItems);
// router.get('/carrito/historial', userLogged, shoppingCartController.history);
// router.get('/carrito/detalle/:id', userLogged, shoppingCartController.buyDetail);

module.exports = router;
