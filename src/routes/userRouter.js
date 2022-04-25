const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');
const db = require('../database/models');
const Users = db.User
const userController = require('../controllers/userController.js');



const validationLogin = [
    body('email').custom((value, { req }) => {
        return Users.findOne({where: {
            email: value
        }}).then(user => {
            if (!user) {
                return Promise.reject('Usuario o contraseña no coinciden');
                } else if(bcrypt.compareSync(req.body.password, user.dataValues.password)){
                return Promise.resolve(true);
            }else{
                return Promise.reject('Usuario o contraseña no coinciden');
            }
        })
    })
]


const ValidationRegister = [
    body('companyName').trim().isLength({ min:1 }).withMessage('El campo Nombre de la Empresa no puede estar vacio'),
    body('activity').trim().isLength({ min:1 }).withMessage('El campo Actividad no puede estar vacio'),
    body('cuit').trim().isLength({ min:1 }).withMessage('El campo CUIT no puede estar vacio'),
    body('cuit').matches(/\b(20|23|24|27|30|33|34)(\D)?[0-9]{8}(\D)?[0-9]/g).withMessage('El campo CUIT no cuenta con el formato correcto'),
    body('web').trim().isLength({ min:1 }).withMessage('El campo Website no puede estar vacio'),
    body('web').trim().isURL().withMessage('El campo Web no cuenta con el formato correcto'),
    body('phone').trim().isLength({ min:1 }).withMessage('El campo Telefono no puede estar vacio'),
    body('phone').trim().matches(/^\(?\d{2}\)?[\s\.-]?\d{4}[\s\.-]?\d{4}$/).withMessage('El campo Telefono no cuenta con el formato correcto'),
    
    body('country').trim().isLength({ min:1 }).withMessage('El campo Pais no puede estar vacio'),
    body('province').trim().isLength({ min:1 }).withMessage('El campo Provincia no puede estar vacio'),
    body('city').trim().isLength({ min:1 }).withMessage('El campo Ciudad no puede estar vacio'),
    body('street').trim().isLength({ min:1 }).withMessage('El campo Calle no puede estar vacio'),
    body('streetAdress').trim().isLength({ min:1 }).withMessage('El campo Nº no puede estar vacio'),
    body('postalCode').trim().isLength({ min:1 }).withMessage('El campo CP no puede estar vacio'),
    
    body('firstName').trim().isLength({ min:1 }).withMessage('El campo Nombre no puede estar vacio'),
    body('lastName').trim().isLength({ min:1 }).withMessage('El campo Apellido no puede estar vacio'),
    body('position').trim().isLength({ min:1 }).withMessage('El campo Cargo no puede estar vacio'),
    body('birthDay').trim().isLength({ min:1 }).withMessage('El campo Dia no puede estar vacio'),
    body('birthMonth').trim().isLength({ min:1 }).withMessage('El campo Mes no puede estar vacio'),
    body('birthYear').trim().isLength({ min:1 }).withMessage('El campo Año no puede estar vacio'),
    body('email').trim().isLength({ min:1 }).withMessage('El campo email no puede estar vacio'),
    body('email').trim().isEmail().withMessage('El campo email no puede estar vacio'),
    body('password').isLength({min: 8 }).withMessage('La contraseña debe tener un mínimo de 8 caractéres'),
    body('repeatPassword').isLength({min: 8 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 8 caractéres'),
    body('repeatPassword').custom((value, {req}) =>{
        if(req.body.password == value ){
            return true    
        }else{
            return false
        }    
    }).withMessage('Las contraseñas deben ser iguales'),
]

// rutas del login
router.get('/login', userController.login)
router.post('/login', validationLogin, userController.access);
router.get('/logout', userController.logout);

// rutas del registro
router.get('/register', userController.register)
router.post('/register', ValidationRegister, userController.create);

// rutas de la recuperación de contraseña
router.get('/forgotPassword', userController.forgot);
// router.post('/forgotPassword', userController.forgotProcess);
router.get('/forgotPasswordMessage', userController.forgotMessage);




module.exports = router;
