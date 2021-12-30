const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const { body } = require('express-validator');
const adminProductControllers = require('../../controllers/admin/adminProductController');
const userLogged = require('../../middlewares/userLogged');
const userAdmin = require('../../middlewares/userAdmin');
const userAnalyst = require('../../middlewares/userAnalyst');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../../public/images/products'));
    },
    filename: function (req, file, cb) {
        cb(null, 'producto-'+Date.now()+path.extname(file.originalname))
    }
})

let upload = multer({ storage });

const validationEdit = [
    body('name').notEmpty().withMessage('El campo Articulo no puede estar vacio'),
    body('detail').notEmpty().withMessage('El campo Detalles no puede estar vacio'),
    body('category').notEmpty().withMessage('El campo Categoria no puede estar vacio'),
    body('stock').notEmpty().withMessage('El campo Stock no puede estar vacio'),
    body('status').notEmpty().withMessage('El campo Estado no puede estar vacio'),
    body('sku').notEmpty().withMessage('El campo Codigo de barra no puede estar vacio'),
    body('discount').notEmpty().withMessage('El campo Descuento no puede estar vacio'),
    body('price').notEmpty().withMessage('El campo Precio no puede estar vacio'),
];

const validationImagenEdit = [
body('image').custom((value, {req}) =>{

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

const validationCreate = [
    body('name').notEmpty().withMessage('El campo Articulo no puede estar vacio'),
    body('detail').notEmpty().withMessage('El campo Detalles no puede estar vacio'),
    body('category').notEmpty().withMessage('El campo Categoria no puede estar vacio'),
    body('stock').notEmpty().withMessage('El campo Stock no puede estar vacio'),
    body('status').notEmpty().withMessage('El campo Estado no puede estar vacio'),
    body('sku').notEmpty().withMessage('El campo Codigo de barra no puede estar vacio'),
    body('discount').notEmpty().withMessage('El campo Descuento no puede estar vacio'),
    body('price').notEmpty().withMessage('El campo Precio no puede estar vacio'),
];

const validationImageCreate = [
    body('image').custom((value, {req}) =>{
    if (req.files == undefined){
        return false;
    }else{
        let files = req.files
        let filetypes = []
        files.forEach(file => {
            filetypes.push(file.mimetype)
        });
        let result = filetypes.some(ft => ft != 'image/jpg' && ft != 'image/jpeg' && ft != 'image/png');
        if (result){
            files.forEach(file => {
                fs.unlinkSync(path.resolve(__dirname, '../../../public/images/products/' + file.filename))
            });
        }
        return !result
    }}).withMessage('Debe elegir una imagen en formato: .JPG ó JPEG ó PNG')
]

router.get('/', userLogged, adminProductControllers.products);

router.get('/create', userLogged, adminProductControllers.createProduct);
router.post('/create', userLogged, upload.array('image'), validationImageCreate, validationCreate, adminProductControllers.saveProduct);
router.get('/addSpecsheet/:id', userLogged,  adminProductControllers.addSpecsheet);
router.post('/saveSpecsheet/:id', userLogged,  adminProductControllers.saveSpecsheet);
router.get('/addDownloads/:id', userLogged, adminProductControllers.addDownloads);
router.post('/saveDownloads/:id', userLogged, adminProductControllers.saveDownloads);

router.get('/edit/:id', userLogged,  adminProductControllers.editProduct);
router.put('/edit/:id', userLogged, upload.array('image'), validationImagenEdit, validationEdit, adminProductControllers.updateProduct);

router.post('/getCategories', userLogged,  adminProductControllers.getCategories);
router.post('/getSubcategories', userLogged,  adminProductControllers.getSubcategories);
router.post('/getBrands', userLogged,  adminProductControllers.getBrands);

router.delete('/delete/:id', userLogged,  adminProductControllers.deleteProduct);

module.exports = router;