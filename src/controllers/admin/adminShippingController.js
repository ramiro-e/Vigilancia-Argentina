const path = require('path');
const fs = require('fs');
const db = require('../../database/models');
const {validationResult} = require('express-validator')
const Products = db.Product;
const ShippingOrder = db.ShippingOrder
const ShippingAdress = db.ShippingAdress


const adminShippingControllers = {
    all: (req, res) => {
        ShippingOrder.findAll()
        .then ((envios)=>{res.render(path.resolve(__dirname, '../../views/admin/shipping/handleShipping'), {
            envios: envios,
            rol: (parseInt(req.session.usuario.role)),
            styles: ["index.css", "footer.css", "handleProduct.css"],
            title: "Panel de envios"
        })})
        .catch(error => res.send(error))
    },
    pending: (req, res) => {
        ShippingOrder.findAll({
            where: {status:1}
        })
        .then ((envios)=>{res.render(path.resolve(__dirname, '../../views/admin/shipping/handleShipping'), {
            envios: envios,
            rol: (parseInt(req.session.usuario.role)),
            styles: ["index.css", "footer.css", "handleProduct.css"],
            title: "Panel de envios"
        })})
        .catch(error => res.send(error))
    },
    delivered: (req, res) => {
        ShippingOrder.findAll({
            where: {status:2}
        })
        .then ((envios)=>{res.render(path.resolve(__dirname, '../../views/admin/shipping/handleShipping'), {
            envios: envios,
            rol: (parseInt(req.session.usuario.role)),
            styles: ["index.css", "footer.css", "handleProduct.css"],
            title: "Panel de envios"
        })})
        .catch(error => res.send(error))
    },
    processing: (req, res) => {
        ShippingOrder.findAll({
            where: {status:3}
        })
        .then ((envios)=>{res.render(path.resolve(__dirname, '../../views/admin/shipping/handleShipping'), {
            envios: envios,
            rol: (parseInt(req.session.usuario.role)),
            styles: ["index.css", "footer.css", "handleProduct.css"],
            title: "Panel de envios"
        })})
        .catch(error => res.send(error))
    },
    received: (req, res) => {
        ShippingOrder.findAll({
            where: {status:4}
        })
        .then ((envios)=>{res.render(path.resolve(__dirname, '../../views/admin/shipping/handleShipping'), {
            envios: envios,
            rol: (parseInt(req.session.usuario.role)),
            styles: ["index.css", "footer.css", "handleProduct.css"],
            title: "Panel de envios"
        })})
        .catch(error => res.send(error))
    },
    search: (req, res) => {
        ShippingOrder.findAll()
        .then ((envios)=>{
            res.render(path.resolve(__dirname, '../../views/admin/envios/handleShipping'), {
            envios: envios,
            styles: ["index.css", "footer.css", "handleProduct.css"],
            title: "Panel de envios"
        })})
        .catch(error => res.send(error))
    },
    detail: (req, res) => {
        ShippingOrder.findByPk(req.params.id)
        .then(envio =>{
        res.render(path.resolve(__dirname, `../../views/admin/envios/shippingDetail`), {
            envio,
            styles: ["index.css", "footer.css", "editProduct.css"],
            title: "Detalle del Envio"
        })})
        .catch(error => res.send(error))
    },
    status: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            ShippingOrder.update({
                status: req.boy.status,
            },{
                where:{
                    id: req.params.id
                }
            })
            .then(()=>{
                return res.redirect('/admin/pagos');
            })
            .catch(error => res.send(error))
        }else{
            ShippingOrder.findAll()
            .then ((envios)=>{res.render(path.resolve(__dirname, '../../views/admin/shipping/handleShipping'), {
                envios: envios,
                rol: (parseInt(req.session.usuario.role)),
                styles: ["index.css", "footer.css", "handleProduct.css"],
                title: "Panel de envios"
            })})
            .catch(error => res.send(error)) 
        }
    },
    edit: (req, res) => {
        ShippingOrder.findByPk(req.params.id)
        .then(envios =>{
        res.render(path.resolve(__dirname, `../../views/admin/envios/editUser`), {
            envios: envios,
            styles: ["index.css", "footer.css", "editProduct.css"],
            title: "Editar envio"
        })})
        .catch(error => res.send(error))
    },
    update: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            ShippingOrder.update({
                shippingAdressId: req.boy.adressId,
                status: req.boy.status,
                shippingMethod: req.boy.method
            },{
                where:{
                    id: req.params.id
                }
            })
            .then(()=>{
                return res.redirect('/admin/pagos');
            })
            .catch(error => res.send(error))
        }else{
            ShippingOrder.findByPk(req.params.id)
            .then(envios =>{
            res.render(path.resolve(__dirname, `../../views/admin/envios/editEnvio`), {
                envios: envios,
                styles: ["index.css", "footer.css", "editProduct.css"],
                title: "Editar envio"
            })})
            .catch(error => res.send(error))
        }
    },
    delete: (req, res) => {
        ShippingOrder.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(()=>{
            return res.redirect('/admin/pagos');
        })
        .catch(error => res.send(error))
    },
    deactivate: (req, res) => {
        ShippingOrder.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(()=>{
            return res.redirect('/admin/pagos');
        })
        .catch(error => res.send(error))
    }
};

module.exports = adminShippingControllers;