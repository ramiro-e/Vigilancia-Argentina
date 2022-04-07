const path = require('path');
const db = require('../../database/models');
const {validationResult} = require('express-validator')
const Order = db.Order;


const adminSalesControllers = {
    sales: (req, res) => {
        Order.findAll()
        .then ((venta)=>{res.render(path.resolve(__dirname, '../../views/admin/sales/handleSales'), {
            venta,
            styles: ["index.css", "footer.css", "handleProduct.css"],
            title: "Panel de Administracion"
        })})
        .catch(error => res.send(error))
    },
    edit: (req, res) => {
        Order.findByPk(req.params.id)
        .then(venta =>{
        res.render(path.resolve(__dirname, `../../views/admin/sales/editSales`), {
            venta,
            styles: ["index.css", "footer.css", "editProduct.css"],
            title: "Editar envio"
        })})
        .catch(error => res.send(error))
    },
    update: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            Order.update({
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar:  req.file ? req.file.filename : '',
                role: role
            },{
                where:{
                    id: req.params.id
                }
            })
            .then(()=>{
                return res.redirect('/admin/envios');
            })
            .catch(error => res.send(error))
        }else{
            Order.findByPk(req.params.id)
            .then(venta =>{
            res.render(path.resolve(__dirname, `../../views/admin/sales/editSales`), {
                venta,
                styles: ["index.css", "footer.css", "editProduct.css"],
                title: "Editar envio"
            })})
            .catch(error => res.send(error))
        }
    },
    delete: (req, res) => {
        Order.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(()=>{
            return res.redirect('/admin/envios');
        })
        .catch(error => res.send(error))
    }
};

module.exports = adminSalesControllers;