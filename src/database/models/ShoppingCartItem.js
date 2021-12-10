module.exports = function(sequelize, dataTypes){
    let alias = "ShoppingCartItem"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },       
        salePrice: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },        
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },        
        subtotal: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        status: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        orderId: {
            type: dataTypes.INTEGER,
        }
    }
    let config = {
        tableName: "shoppingcartitems",
        timestamps: true
    }

    let shoppingCartItems = sequelize.define(alias, cols, config)

    shoppingCartItems.associate = function (models){
        shoppingCartItems.belongsTo(models.Product, {
            as: "product",
            foreignKey: "productId",
        });
    }
    shoppingCartItems.associate = function (models){    
        shoppingCartItems.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId",
        });
    }
    shoppingCartItems.associate = function (models){
        shoppingCartItems.belongsTo(models.Order, {
            as: "order",
            foreignKey: "orderId",
        });
    }

    return shoppingCartItems
}
