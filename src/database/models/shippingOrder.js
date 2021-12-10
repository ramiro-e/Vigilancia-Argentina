module.exports =  (sequelize, dataTypes) => {
    let alias = "ShippingOrder"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId:{type: dataTypes.INTEGER},
        orderId:{type: dataTypes.INTEGER},
        status:{type: dataTypes.INTEGER},
        shippingAdressId:{type: dataTypes.INTEGER},
        shippingMethod:{type: dataTypes.INTEGER},

    }
    let config = {
        tableName: "shipping_orders",
        timestamps: false
    }
    const ShippingOrder = sequelize.define(alias, cols, config);

    ShippingOrder.associate = function (models) {
        ShippingOrder.belongsTo(models.User,{
                as: "user",
                foreingKey: "userId"
            }
        );
    }

    ShippingOrder.associate = function (models) {
        ShippingOrder.belongsTo(models.ShippingAdress,{
                as: "shippingAdress",
                foreingKey: "shippingAdressId"
            }
        );
    }

    ShippingOrder.associate = function (models) {
        ShippingOrder.belongsTo(models.Order,{
                as: "order",
                foreingKey: "orderId"
            }
        );
    }

    ShippingOrder.associate = function (models) {
        ShippingOrder.hasMany(models.Order,{
            as: "shippingOrder",
            foreingKey: "shippingId"
        });
    }


    return ShippingOrder;
}