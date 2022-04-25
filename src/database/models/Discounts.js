module.exports =  function(sequelize, dataTypes) {
    let alias = "Coupon"
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        code: {
            type: dataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        used: {
            type: dataTypes.BOOLEAN,
            defaultValue: false,
        },
    }
    let config = {
        tableName: "coupons",
        timestamps: false
    }
    
    let Coupon = sequelize.define(alias, cols, config);

    Coupon.associate = function (models) {

        Coupon.hasMany(models.Order,{
            foreingKey: "couponId",
            as:"couponId"
        });

    }

    return Coupon;
}