const path = require('path');
const fs = require("fs")
const db = require('../database/models');
const Products = db.Product
const sequelize = require('sequelize')
const Op = sequelize.Op


module.exports = {
    index: (req,res)=>{
        console.log(req.session.usuario)
        if (req.cookie.recentlyVisited){
            let recentlyVisitedArray = JSON.parse(req.cookie.recentlyVisited)
            if (recentlyVisitedArray.length >= 4){
                let recentlyVisited = Products.findAll({ limit: 4, where: { id: recentlyVisitedArray } })
            }
        }
        let discounted = Products.findAll({ limit: 8, where:{discount:{[Op.gt]:0}}})
        let recentlyAdded = Products.findAll({ limit: 4, order: [["createdAt", "DESC"]]})
        Promise.all([discounted, recentlyAdded])
        .then(([discounted, recentlyAdded]) => {
            res.render(path.resolve(__dirname, '../views/main/index'), {
                title: "Vigilancia Argentina",
                slider: fs.readdirSync(path.resolve(__dirname, '../../public/images/web/sliderHeader')),
                recentlyVisited,
                discounted,
                recentlyAdded,
            })
        })
        .catch(error => res.send(error))
    },
    catalog: (req,res)=>{
        Products.findAll()
        .then ((products)=>{res.render(path.resolve(__dirname, '../views/main/catalog'), {
            title: "Catalogo | Vigilancia Argentina",
            products,
        })})
        .catch(error => res.send(error))
    },
    detalle: (req, res) => { 
        if (req.cookie.recentlyVisited){
            let recentlyVisitedArray = JSON.parse(req.cookie.recentlyVisited)
            recentlyVisitedArray.unshift(req.params.id);
            res.cookie('recentlyVisited', JSON.stringify(recentlyVisitedArray),{maxAge: 1000 * 60 * 60 * 24 * 10})
            
        }else{
            let recentlyVisitedArray = [req.params.id]
            res.cookie('recentlyVisited', JSON.stringify(recentlyVisitedArray),{maxAge: 1000 * 60 * 60 * 24 * 10})
        }
        products.findByPk(req.params.id,{
                include: ["category"]
        })
        .then (producto => {
            res.render(path.resolve(__dirname, '../views/products/productDetail'), {
            producto,
            title: producto.productName + " | Vigilancia Argentina"})
        })
        .catch(error => res.send(error))
    }
}