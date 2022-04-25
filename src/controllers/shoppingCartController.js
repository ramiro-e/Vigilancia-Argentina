const path = require('path')
const {validationResult} = require('express-validator')
const db = require('../database/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Products = db.Product
const Order = db.Order
const ShoppingCartItem = db.ShoppingCartItem
const Coupon = db.Coupon




const sequelizeRaw = new Sequelize('vigilancia_argentina_db', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
    storage: 'path/to/database.sqlite',
  
    operatorsAliases: false
});


const shoppingCartController = {
    
    shoppingCart: (req,res) => {
        res.render(path.resolve(__dirname, '../views/shoppingCart/shoppingCartMain'), {
            styles: ["index.css", "footer.css", "carrito.css"],
            title: "Carrito de Compra"
        });

    },
    getItems: (req,res) => {
        ShoppingCartItem.findAll({
            where : {
                status: 0,
                userId : req.session.usuario.id
            },
            include: [{
                model:Products,
                as:"product"
            }],
            attributes: [
                [sequelize.fn('sum', sequelize.col('amount')), 'amount'],
            ],
            group: ['accountId'],
            where:{accountId: account.id},
            raw: true
        })        
        .then((items)=>{  
            let discountCode = req.body.discountCode ? req.body.discountCode.toUpperCase() : ''          
            Coupon.findOne({
                where:{
                    code: discountCode,
                    used: false
                }
            })
            .then((discount)=>{
                let discountAmount = 0
                if(discount){
                    discountAmount = discount.amount
                }

                let total = items.reduce((total,item)=> (total = total + (item.product.price - ((item.product.price * 100) / item.product.discount)) * item.quantity),0)
                total = total - discountAmount
                res.send({items, discount: discountAmount, total})
            })
            .catch(error => console.log(error))
        

        })
        .catch(error => console.log(error))
    },
    addItem: (req,res) =>{
        const errors = validationResult(req);
        if(errors.isEmpty()){

            ShoppingCartItem.findOne({
                where:{
                    userId: req.session.usuario.id,
                    productId: req.body.productId
                }
            })
            .then((item)=>{
                if(!item){
                    return ShoppingCartItem.create({
                        quantity : req.body.quantity,
                        status: 0,
                        userId: req.session.usuario.id,
                        productId: req.body.productId,
                        orderId: null                     
                    }) 
                }else{
                    return ShoppingCartItem.update({
                        quantity : parseInt(item.quantity) + parseInt(req.body.quantity),
                    },{
                        where: {
                            userId: req.session.usuario.id,
                            productId: req.body.productId
                        }
                    }) 
                }

            })
            .then(listo  => res.redirect('/'))
            .catch(error => console.log(error)) 
        }else{
            Products.findByPk(req.params.id,{
                    include: ["category"]
            })
            .then (producto => {
                res.render(path.resolve(__dirname, '../views/products/productDetail'), {
                producto,
                styles: ["producto.css", "footer.css"],
                title: producto.productName})
            })
            .catch(error => res.send(error))
        }    
    },
    deleteItem: (req,res) =>{
        ShoppingCartItem.destroy({
            where: {
                id: req.body.itemId,
                userId : req.session.usuario.id
            }
        })
        .then(()=> {
            let response = {
                meta: {
                    status: 200
                }
            } 
            res.json(response)
        })
        .catch(error => console.log(error))
    },
    changeQuantity: (req,res) => {
        ShoppingCartItem.update({
            quantity: req.body.quantity
        },{
            where:{
                id: req.body.itemId
            }
        })
        .then((ans)=> {
            let response = {
                meta: {
                    status: 200
                }
            } 
            res.json(response)
        })
        .catch(error => console.log(error))
    },
    purchaseItems: (req,res)=>{
        let salePrice = 0;
        let discountCode = req.body.discountCode ? req.body.discountCode.toUpperCase() : ''          
        ShoppingCartItem.findAll({
            where : {
                status: 0,
                userId : req.session.usuario.id
            },
            include: [{
                model:Products,
                as:"product"
            }]
        })        
        .then((items)=>{  
            let discountCode = req.body.discountCode ? req.body.discountCode.toUpperCase() : ''          
            Coupon.findOne({
                where:{
                    code: discountCode,
                    used: false
                }
            })
            .then((discount)=>{
                let discountAmount = 0
                if(discount){
                    discountAmount = discount.amount
                }

                let total = items.reduce((total,item)=> (total = total + (item.product.price - ((item.product.price * 100) / item.product.discount)) * item.quantity),0)
                total = total - discountAmount
                res.send({items, discount: discountAmount, total})
            })
            .catch(error => console.log(error))
        

        })
        .then((data)=>{
            return Order.create({
                userId: req.session.usuario.id,
            })
        })
        .then((data)=>{
            return sequelizeRaw.query(`UPDATE shoppingcartitems, products SET salePrice = price - ((price * 100) / discount), subtotal = (price - ((price * 100) / discount)) * quantity, status = 1 WHERE products.id = productId AND userId=${req.session.usuario.id} AND status = 0`)
        })
        .catch(error => console.log(error))
         
    }

   
    //     Order.findOne({
    //         order: [['createdAt','DESC']]
    //     })
    //     .then((order)=>{
    //         return Order.create({
    //             orderId: order ? order.orderId + 1 : 1,
    //             total: totalPrecio,
    //             userId: req.session.usuario.id
    //         })
    //     })
    //     .then(order =>{

    //         Item.update({
    //             status: 0,
    //             orderId: order.id
    //         },{
    //             where: {
    //                 userId: req.session.usuario.id,
    //                 status: 1
    //             }
    //         }
    //         )
    //     })
    //     .then(()=> res.redirect('/'))
    //     .catch(error => console.log(error))
    // },


    // history : (req,res) =>{
    //     Order.findAll({
    //         where: {
    //             userId : req.session.usuario.id
    //         },
    //         include: {
    //             all: true,
    //             nested: true
    //         }
    //     })
    //     .then(orders =>{
    //         res.render(path.resolve(__dirname, '..','views','carrito','historialCompra'), Order );           
    //     })
    // },
    // buyDetail : (req,res) =>{
    //     Order.findByPk(req.params.id, {
    //         include : {
    //             all: true,
    //             nested: true
    //         }
    //     })
    //     .then((order) =>{
    //         res.render(path.resolve(__dirname, '..','views','carrito','detalleCompra'), Order );
    //     })
    // }
    
}


module.exports = shoppingCartController