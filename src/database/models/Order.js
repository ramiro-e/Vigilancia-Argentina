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
        couponId:{type: dataTypes.INTEGER},
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

        Order.belongsTo(models.Coupon,{
            as: "coupon",
            foreingKey: "couponId"
        });

        Order.belongsTo(models.User,{
            as: "user",
            foreingKey: "userId"
        });

        Order.belongsTo(models.Payment,{
            as: "payment",
            foreingKey: "paymentId"
        });

        Order.belongsTo(models.ShippingOrder,{
            as: "shippingOrder",
            foreingKey: "shippingId"
        });

    }
    
    return Order;
}