const path = require('path');
const fs = require('fs');
const db = require('../../database/models');
const {validationResult} = require('express-validator')
const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;
const Payments = db.Payment;

const adminPaymentControllers = {
    payments: (req, res) => {
        Payments.findAll()
        .then ((pagos)=>{res.render(path.resolve(__dirname, '../../views/admin/payments/handlePayments'), {
            rol: req.session.usuario.role,
            pagos,
            styles: ["index.css", "footer.css", "handleProduct.css"],
            title: "Panel de Administracion"
        })})
        .catch(error => res.send(error))
    },
    detail: (req, res) => {
        Payments.findByPk(req.params.id)
        .then(pago =>{
        res.render(path.resolve(__dirname, `../../views/admin/payments/paymentDetail`), {
            pago,
            styles: ["index.css", "footer.css", "editProduct.css"],
            title: "Editar pago"
        })})
        .catch(error => res.send(error))
    },
    delete: (req, res) => {
        Payments.destroy({
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
module.exports = adminPaymentControllers;