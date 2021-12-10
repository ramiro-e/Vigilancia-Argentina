module.exports =  (sequelize, dataTypes) => {
    let alias = "ShippingAdress"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {type: dataTypes.INTEGER},
        provincia: {type: dataTypes.STRING},
        municipio: {type: dataTypes.STRING},
        calle: {type: dataTypes.STRING},
        direccion: {type: dataTypes.STRING},
        unidad: {type: dataTypes.STRING},
        codigo: {type: dataTypes.STRING}
    }
    let config = {
        tableName: "shipping_adress",
        timestamps: false
    }
    const ShippingAdress = sequelize.define(alias, cols, config);

    
    ShippingAdress.associate = function (models) {
        ShippingAdress.belongsTo(models.User,{
                as: "user",
                foreingKey: "userId"
            }
        );
    }

    ShippingAdress.associate = function (models) {
        ShippingAdress.hasMany(models.ShippingOrder,{
            as: "shippingAdress",
            foreingKey: "shippingAdressId"
        });
    }

    return ShippingAdress;
}