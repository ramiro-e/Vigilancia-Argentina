const path = require('path');
const {validationResult} = require('express-validator')
const lodash = require('lodash')
const sequelize = require('sequelize')
const Op = sequelize.Op
const db = require('../database/models');
const Products = db.Product;
const Subcategories = db.Subcategory;
const Categories = db.Category;
const Brands = db.Brand

const ProductControllers = {

    detail: (req, res) => {
        Products.findByPk(req.params.id,{
            include: [{
                model: Subcategories,
                include: [{
                    model: Categories
                }]
            }]
        })
        .then ((product)=>{
            res.render(path.resolve(__dirname, '../views/products/detail'), {
                category: product.Subcategory.Category,
                subcategory: product.Subcategory,
                product,
                specsheet: JSON.parse(product.specsheet),
                downloads: JSON.parse(product.downloads),
                images: JSON.parse(product.image),
                title: "Detalle | " + product.name
            })
        })
        .catch(error => res.send(error))
    }
}

module.exports = ProductControllers;