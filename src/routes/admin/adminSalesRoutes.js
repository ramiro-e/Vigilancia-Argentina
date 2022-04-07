const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const adminSalesControllers = require('../../controllers/admin/adminSalesController');
const userLogged = require('../../middlewares/userLogged');
const userAdmin = require('../../middlewares/userAdmin');
const userAnalyst = require('../../middlewares/userAnalyst');


router.get('/admin/ventas', userLogged, userAdmin, adminSalesControllers.sales)

router.get('/admin/ventas/ventas', userLogged, userAdmin, adminSalesControllers.sales)
router.get('/admin/ventas/editar/:id', userLogged, userAdmin, adminSalesControllers.edit);
router.put('/admin/ventas/editar/:id', userLogged, userAdmin,validacionesEdit, adminSalesControllers.update);


router.delete('/admin/ventas/eliminar/:id',userLogged, userAdmin, adminSalesControllers.delete);

module.exports = router;