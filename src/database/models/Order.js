module.exports =  (sequelize, dataTypes) => {
    let alias = "Order"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total:{type: dataTypes.INTEGER},
        status:{type: dataTypes.INTEGER},
        userId:{type: dataTypes.INTEGER},
        paymentId:{type: dataTypes.INTEGER},
        shippingId:{
            type: dataTypes.INTEGER,
            allowNull:true
        }

    }
    let config = {
        tableName: "orders",
        timestamps: false
    }
    const Order = sequelize.define(alias, cols, config);

    Order.associate = function (models) {
        Order.belongsTo(models.Payment,{
                as: "payment",
                foreingKey: "paymentId"
            }
        );
    }

    Order.associate = function (models) {
        Order.belongsTo(models.User,{
                as: "user",
                foreingKey: "userId"
            }
        );
    }

    Order.associate = function (models) {
        Order.belongsTo(models.ShippingOrder,{
                as: "shippingOrder",
                foreingKey: "shippingId"
            }
        );
    }

    
    Order.associate = function (models) {
        Order.hasMany(models.Payment,{
            as: "order",
            foreingKey: "orderId"
        });
    }

    Order.associate = function (models) {
        Order.hasMany(models.ShippingOrder,{
            as: "order",
            foreingKey: "orderId"
        });
    }

    Order.associate = function (models) {
        Order.hasMany(models.ShoppingCartItem,{
            as: "order",
            foreingKey: "orderId"
        });
    }

    return Order;
}