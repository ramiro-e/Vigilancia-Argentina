const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const adminUserControllers = require('../../controllers/admin/adminUserController');
const userLogged = require('../../middlewares/userLogged');
const userAdmin = require('../../middlewares/userAdmin');
const userAnalyst = require('../../middlewares/userAnalyst');
const userID = require('../../middlewares/userID');


router.get('/admin/adminstrar', userLogged, userAnalyst, adminUserControllers.admin)

router.get('/admin/usuarios', userLogged, userAnalyst, adminUserControllers.users);

router.get('/admin/usuarios/crearAdmin', userLogged, userAdmin, adminUserControllers.createAdmin);
router.post('/admin/usuarios/crearAdmin', userLogged, userAdmin, validacionesCreate, upload.single('imagen'), validacionesImagenCreate, adminUserControllers.saveAdmin);

router.get('/admin/usuarios/editar/:id', userLogged, userID, adminUserControllers.editUser);
router.put('/admin/usuarios/editar/:id', userLogged, userID,validacionesEdit, upload.single('imagen'), validacionesImagenEdit, adminUserControllers.updateUser);

router.delete('/admin/usuarios/eliminar/:id',userLogged, userAdmin, adminUserControllers.deleteUser);

module.exports = router;