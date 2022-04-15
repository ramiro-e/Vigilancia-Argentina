const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const adminPaymentControllers = require('../../controllers/admin/adminPaymentController');
const userLogged = require('../../middlewares/userLogged');
const userAdmin = require('../../middlewares/userAdmin');
const userAnalyst = require('../../middlewares/userAnalyst');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/img'));
    },
    filename: function (req, file, cb) {
      cb(null, 'producto-'+Date.now()+path.extname(file.originalname))
  }
})
const upload = multer({ storage })

const validacionesEdit = [
    body('articulo').isEmpty().withMessage('El campo Articulo no puede estar vacio'),
    // body('articulo').isLength({min: 5}).withMessage('El campo Articulo no puede estar vacio'),
    body('descripcion').isEmpty().withMessage('El campo Descripcion no puede estar vacio'),
    // body('descripcion').isLength({min: 20}).withMessage('El campo Descripcion no puede estar vacio'),
    body('detalles').isEmpty().withMessage('El campo Detalles no puede estar vacio'),
    body('categoria').isEmpty().withMessage('El campo Categoria no puede estar vacio'),
    body('subcategoria').isEmpty().withMessage('El campo Subcategoria no puede estar vacio'),
    body('stock').isEmpty().withMessage('El campo Stock no puede estar vacio'),
    body('status').isEmpty().withMessage('El campo Estado no puede estar vacio'),
    body('sku').isEmpty().withMessage('El campo Codigo de barra no puede estar vacio'),
    body('descuento').isEmpty().withMessage('El campo Descuento no puede estar vacio'),
    body('precio').isEmpty().withMessage('El campo Precio no puede estar vacio'),
];

const validacionesImagenEdit = [
body('imagen').custom((value, {req}) =>{

        if (req.file == undefined) return false;

            return true;
  }).withMessage('Debe cargar una imagen válida')
  .bail()
  .custom((value, {req}) =>{

            let filetype = req.file.mimetype
            switch (filetype) {
                case 'image/jpg':
                    return true;
                case 'image/jpeg':
                    return true;
                case  'image/png':
                    return true;
                default:
                    return false;

        }
  }).withMessage('Debe elegir una imagen en formato: .JPG ó JPEG ó PNG')
];

const validacionesCreate = [
    body('articulo').isEmpty().withMessage('El campo Articulo no puede estar vacio'),
    // body('articulo').isLength({min: 5}).withMessage('El campo Articulo no puede estar vacio'),
    body('descripcion').isEmpty().withMessage('El campo Descripcion no puede estar vacio'),
    // body('descripcion').isLength({min: 20}).withMessage('El campo Descripcion no puede estar vacio'),
    body('detalles').isEmpty().withMessage('El campo Detalles no puede estar vacio'),
    body('categoria').isEmpty().withMessage('El campo Categoria no puede estar vacio'),
    body('subcategoria').isEmpty().withMessage('El campo Subcategoria no puede estar vacio'),
    body('stock').isEmpty().withMessage('El campo Stock no puede estar vacio'),
    body('status').isEmpty().withMessage('El campo Estado no puede estar vacio'),
    body('sku').isEmpty().withMessage('El campo Codigo de barra no puede estar vacio'),
    body('descuento').isEmpty().withMessage('El campo Descuento no puede estar vacio'),
    body('precio').isEmpty().withMessage('El campo Precio no puede estar vacio'),
];

const validacionesImagenCreate = [
    body('imagen').custom((value, {req,}) =>{
        if(req.file == undefined){
            let filetype = req.file.mimetype
            switch (filetype) {
                case 'image/jpg':
                    return false;
                case 'image/jpeg':
                    return false;
                case  'image/png':
                    return false;
                default:
                    return true;
        }
    }}).withMessage('Debe elegir una imagen en formato: .JPG ó JPEG ó PNG')
];


router.get('/admin/pagos', userLogged, userAnalyst, adminPaymentControllers.payments)

router.get('/admin/pagos/detalle', userLogged, userAnalyst, adminPaymentControllers.detail)

router.delete('/admin/pagos/eliminar/:id',userLogged, userAdmin, adminPaymentControllers.delete);

module.exports = router;