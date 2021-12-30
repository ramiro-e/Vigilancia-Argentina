const path = require('path');
const db = require('../../database/models');
const {validationResult} = require('express-validator')
const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;
const Brands = db.Brand


const adminProductControllers = {

    products: (req, res) => {
        Products.findAll()
        .then ((productos)=>{res.render(path.resolve(__dirname, '../../views/admin/products/handleProduct'), {
            productos,
            title: "Panel de Administracion"
        })})
        .catch(error => res.send(error))
    },
    createProduct: (req, res) => {
        res.render(path.resolve(__dirname, '../../views/admin/products/newProduct'), {
            title: "Crear nuevo producto"
        })
    },
    saveProduct: (req, res) => {
        let validation = validationResult(req);
        let errors = validation.errors;
        if (validation.isEmpty()){
            let files = req.files
            let filenames = []
            files.forEach(file => {
                filenames.push(file.filename)
            });
            Products.create ({
                sku: req.body.sku,
                subcategoryId: req.body.subcategory,
                brandId: req.body.brand,
                model: req.body.model,
                name: req.body.name,
                detail: req.body.detail,
                description: req.body.description,
                image: JSON.stringify(filenames),
                price: req.body.price,
                discount: req.body.price,
                stock: req.body.stock,
                status: req.body.status
            })
            .then((response)=>{
                return res.redirect('/admin/product/addSpecsheet/' + response.id);
            })
            .catch(error => res.send(error))
        }else{     
            res.render(path.resolve(__dirname, '../../views/admin/products/newProduct'), {
                title: "Crear nuevo producto",
                errors
            })
        }
        
    },
    addSpecsheet: (req, res) => {
        res.render(path.resolve(__dirname, '../../views/admin/products/newProductSpecsheet'), {
            title: "Crear nuevo producto"
        })        
    },
    saveSpecsheet: (req, res) => {
        if (req.body.length > 0){
            Products.update({
                specsheet: JSON.stringify(req.body)
            },{
                where:{
                    id: parseInt(req.params.id)
                }
            })
            .then(()=>{
                return res.status(200).send({result: 'redirect', url:'/admin/product/addDownloads/' + req.params.id})
            })
            .catch(error => res.send(error))
        }else{
            return res.status(200).send({result: 'redirect', url:'/admin/product/addDownloads/' + req.params.id})
        }
    },
    addDownloads: (req, res) => {
        res.render(path.resolve(__dirname, '../../views/admin/products/newProductDownloads'), {
            title: "Crear nuevo producto"
        })        
    },
    saveDownloads: (req, res) => {
        if (req.body.specsheet.length > 0 || req.body.resources.length > 0 || req.body.manuals.length > 0 || req.body.software.length > 0 || req.body.FAQ.length > 0){
            Products.update({
                downloads: JSON.stringify(req.body)
            },{
                where:{
                    id: parseInt(req.params.id)
                }
            })
            .then(()=>{
                return res.status(200).send({result: 'redirect', url:'/admin/product'})
            })
            .catch(error => res.send(error))
        }else{
            return res.status(200).send({result: 'redirect', url:'/admin/product'})
        }
    },
    editProduct: (req, res) => {
        let Categories = Categories.findAll();
        let Subcategories = Subcategories.findAll();
        let products = Products.findByPk (req.params.id)
        Promise.all([Categories, Subcategories, products])
        .then(([Categories, Subcategories,products]) =>{
            res.render(path.resolve(__dirname, `../../views/admin/products/editProduct`), {
                categorias: Categories,
                subcategorias: Subcategories,
                producto: products,
                styles: ["index.css", "footer.css", "editProduct.css"],
                title: "Editar producto"
            })
        })
        .catch(error => res.send(error))
    },
    updateProduct: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            Products.update({
                sku: req.body.sku,
                subcategoryId: req.body.subcategory,
                brandId: req.body.brand,
                model: req.body.model,
                productName: req.body.name,
                description: req.body.description,
                detail: req.body.detail,
                image: req.file.filename,
                price: req.body.price,
                discount: req.body.discount,
                stock: req.body.stock,
                status: req.body.status
            },{
                where:{
                    id: req.params.id
                }
            })
            .then(()=>{
                return res.redirect('/admin/product');
            })
            .catch(error => res.send(error))
        }else{
            const Categories = Categories.findAll();
            const Subcategories = Subcategories.findAll();
            const products = Products.findByPk (req.params.id)
            Promise.all([Categories, Subcategories,products])
            .then( ([Categories, Subcategories,products]) =>{
                res.render(path.resolve(__dirname, `../../views/admin/products/editProduct`), {
                    errors: errors.array(),
                    categorias: Categories,
                    subcategorias: Subcategories,
                    producto: products,
                    styles: ["index.css", "footer.css", "editProduct.css"],
                    title: "Editar producto"
                })
            })
            .catch(error => res.send(error))
        }
    },
    deleteProduct: (req, res) => {
        Products.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(()=>{
            return res.redirect('/admin/product');
        })
        .catch(error => res.send(error))
    },
    getData: (req, res) => {
        const Categories = Categories.findAll();
        console.log(Categories)
        const Subcategories = Subcategories.findAll();
        console.log(Subcategories)
        const Brands = Brands.findAll();
        console.log(Brands)
        Promise.all([Categories, Subcategories, Brands])
        .then( ([Categories, Subcategories, Brands]) => {
            res.send({categories: Categories, subcategories: Subcategories, brands: Brands})
        })
        .catch(error => res.send(error))
    },
    getCategories: (req, res) => {
        Categories.findAll()
        .then( (categories) => {
            res.send(categories)
        })
        .catch(error => res.send(error))
    },
    getSubcategories: (req, res) => {
        Subcategories.findAll()
        .then( (subcategories) => {
            res.send(subcategories)
        })
        .catch(error => res.send(error))
    },
    getBrands: (req, res) => {
        Brands.findAll()
        .then( (brands) => {
            console.log(brands)
            res.send(brands)
        })
        .catch(error => res.send(error))
    }
};

module.exports = adminProductControllers;



