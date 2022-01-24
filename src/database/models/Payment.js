module.exports =  (sequelize, dataTypes) => {
    let alias = "Payment"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {type: dataTypes.INTEGER},
        orderId: {type: dataTypes.INTEGER},
        payMethod: {type: dataTypes.INTEGER},
        payInfo: {type: dataTypes.TEXT},

    }
    let config = {
        tableName: "payments",
        timestamps: false
    }
    const Payment = sequelize.define(alias, cols, config);

    Payment.associate = function (models) {
        Payment.belongsTo(models.User,
            {
                as: "user",
                foreingKey: "userId"
            }
        );
    }

    Payment.associate = function (models) {
        Payment.belongsTo(models.Order,
            {
                as: "order",
                foreingKey: "orderId"
            }
        );
    }

    Payment.associate = function (models) {
        Payment.hasMany(models.Order,{
            as: "payment",
            foreingKey: "paymenId"
        });
    }

    return Payment;
}