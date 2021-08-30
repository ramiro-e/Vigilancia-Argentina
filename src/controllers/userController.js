const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const { validationResult } = require('express-validator')
const dbProduct = db.Product;
const Users = db.User


module.exports = {
    login: (req,res) => {
        res.render(path.resolve(__dirname, '../views/user/login'),{
            title: "Ingresar | Vigilancia Argentina"
        })
    },
    access: (req, res) => {
        let validation = validationResult(req);             //return res.send(errors.mapped());
        let errors = validation.errors;
        console.log(errors);
        if(validation.isEmpty()){
            Users.findOne({
                where:{email:req.body.email}
            })                                              //return res.send(userLogin);
            .then((user) => {
                delete user.password;
                req.session.usuario = user;
                if(req.body.recordarme){
                    res.cookie('email', user.email,{maxAge: 1000 * 60 * 60 * 24})
                }
                return res.redirect('/');
            })
            .catch(error => console.log(error))
        }else{
            res.render(path.resolve(__dirname, '../views/user/login'),{
                title: "Ingresar | Vigilancia Argentina",
                errors
            })
        }
    },
    logout: (req,res) =>{
        req.session.destroy();
        res.cookie('email',null,{maxAge: -1});
        res.redirect('/')
    },
    register: (req,res) => {
        res.render(path.resolve(__dirname, '../views/user/register'),{
            title: "Registrarse | Vigilancia Argentina"
        })
    },
    create:  (req, res) => {
        let validation = validationResult(req);
        let errors = validation.errors;
        if (validation.isEmpty()) {
            Users.create({
                companyName: req.body.companyName,
                activity: req.body.activity,
                cuit: req.body.cuit.replace(/(?:\s*-\s*)+|\s{2,}/,''),
                web: req.body.web,
                phone: req.body.phone,
                country: req.body.country,
                province: req.body.province,
                city: req.body.city,
                street: req.body.street,
                streetAdress: req.body.streetAdress,
                apartmentFloor: req.body.apartmentFloor,
                apartmentUnit: req.body.apartmentUnit,
                postalCode: req.body.postalCode,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                position: req.body.position,
                birthDay: req.body.birthDay,
                birthMonth: req.body.birthMonth,
                birthYear: req.body.birthYear,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                acceptNewsletter: 1,
                role: 2
            })
            .then(() => {
                return res.render(path.resolve(__dirname, '../views/user/registerMessage'),{
                    title: "¡Registro Exitoso! | Vigilancia Argentina"
                });
            })
            .catch(error => res.send(error));
        } else {
            console.log(errors)
            return res.render(path.resolve(__dirname, '../views/user/register'),{
                title: "Registrarse | Vigilancia Argentina",
                errors
            });
        }
    },
    forgot: (req, res) => {
        return res.render(path.resolve(__dirname, '../views/user/forgotPassword'),{
            title: "Recuperar Contraseña | Vigilancia Argentina"
        })
    },
    forgotMessage: (req, res) => {
        return  res.render(path.resolve(__dirname, '../views/user/forgotPasswordMessage'), {
            title: "Recuperar Contraseña | Vigilancia Argentina"
        })
    },
    registerMessage: (req, res) => {
        return  res.render(path.resolve(__dirname, '../views/user/registerMessage'), {
            title: "Tu Registro Fue Exitoso | Vigilancia Argentina"
        })
    }
}