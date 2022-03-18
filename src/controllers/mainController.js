const path = require('path');
const fs = require("fs")
const db = require('../database/models');
const Products = db.Product
const sequelize = require('sequelize')
const Op = sequelize.Op


module.exports = {
    index: (req,res)=>{
        let discounted = Products.findAll({ limit: 8, where:{discount:{[Op.gt]:0}}})
        let recentlyAdded = Products.findAll({ limit: 4, order: [["createdAt", "DESC"]]})
        Promise.all([discounted, recentlyAdded])
        .then(([discounted, recentlyAdded]) => {
            res.render(path.resolve(__dirname, '../views/main/index'), {
                title: "Vigilancia Argentina",
                slider: fs.readdirSync(path.resolve(__dirname, '../../public/images/web/sliderHeader')),
                discounted,
                recentlyAdded,
            })
        })
        .catch(error => res.send(error))
    }
}