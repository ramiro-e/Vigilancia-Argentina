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
    },
    catalog: (req,res)=>{
        Products.findAll()
        .then ((products)=>{
            res.render(path.resolve(__dirname, '../views/main/catalog'), {
            title: "Catalogo | Vigilancia Argentina",
            products,
        })})
        .catch(error => res.send(error))
    },
    filter: async (req,res)=>{
        let whereObject = {}
        let orderArray
        if (req.query.search){
            whereObject['name'] = {[Op.like]: `%${req.query.search}%`}
        }else if(req.query.categoryId){
            whereObject['categoryId'] = {[Op.eq]: req.query.categoryId}
        }else if(req.query.subcategoryId){
            whereObject['subcategoryId'] = {[Op.eq]: req.query.subcategoryId}
        }else if(req.query.brandId){
            whereObject['brandId'] = {[Op.eq]: req.query.brandId}
        }else if(req.query.minPrice || !req.query.maxPrice){
            whereObject['price'] = {[Op.gte]: req.query.minPrice}
        }else if(!req.query.minPrice || req.query.maxPrice){
            whereObject['price'] = {[Op.lte]: req.query.maxPrice}
        }else if(req.query.minPrice || req.query.maxPrice){
            whereObject['price'] = {[Op.between]: [req.query.minPrice, req.query.maxPrice]}
        }else if(req.query.order){
            if (req.query.order == 'leastExpensive') {
                orderArray = [["price", "DESC"]]
            } else if (req.query.order == 'mostExpensive'){
                orderArray = [["price", "ASC"]]
            } else if (req.query.order == 'lastAdded'){
                orderArray = [["createdAt", "DESC"]]
            }
        }else if(!req.query.order){
            orderArray = [["createdAt", "DESC"]]
        }

        let catalogData = {}

        let products = await Products.findAll({
            where: whereObject,
            order: orderArray
        })
        catalogData['products'] = products

        let subcategoryIdArray = idArrayGenerator(catalogData.products, 'subcategoryId')
        let subcategories = await queryModel(Subcategories, subcategoryIdArray)
        catalogData['subcategories'] = subcategories

        let categoryIdArray = idArrayGenerator(catalogData.subcategories, 'categoryId')
        let categories = await queryModel(Categories, categoryIdArray)
        catalogData['categories'] = categories

        let brandIdArray = idArrayGenerator(catalogData.products, 'brandId')
        let brands = await queryModel(Brands, brandIdArray)
        catalogData['brands'] = brands

        res.render(path.resolve(__dirname, '../views/main/catalog'), {
            title: "Catalogo | Vigilancia Argentina",
            products: catalogData.products,
            categories: catalogData.subcategories,
            brands: catalogData.brands,
        })

        function idArrayGenerator(objects, property){
            let array = objects.map(object => object[property])
            let arraySanitized = lodash(array).sortedUniq().sortBy().value()
            return arraySanitized
        }

        async function queryModel(Model, idArray, catalogData){
            let result = Model.findAll({
                where:{ id: idArray }
            })
            return result
        }
    },
    search: (req,res)=>{
        Products.findAll()
        .then ((products)=>{res.render(path.resolve(__dirname, '../views/main/catalog'), {
            title: "Catalogo | Vigilancia Argentina",
            products,
        })})
        .catch(error => res.send(error))
    }

}

module.exports = ProductControllers;