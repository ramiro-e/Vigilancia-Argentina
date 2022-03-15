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
            allowNull: true
        },        
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },        
        subtotal: {
            type: dataTypes.DECIMAL,
            allowNull: true
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

    let ShoppingCartItem = sequelize.define(alias, cols, config)

    ShoppingCartItem.associate = function (models){

        ShoppingCartItem.belongsTo(models.Product, {
            foreignKey: "productId",
            as:"product"
        });

        ShoppingCartItem.belongsTo(models.User, {
            foreignKey: "userId",
        });

        ShoppingCartItem.belongsTo(models.Order, {
            foreignKey: "orderId",
        });

    }

    return ShoppingCartItem
}
