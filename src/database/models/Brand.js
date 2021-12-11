const Product = require("./Product");

module.exports =  function(sequelize, dataTypes) {
    let alias = "Brand"
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        brand: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName: "brands",
        timestamps: false
    }
    
    let Brand = sequelize.define(alias, cols, config);
        
        Brand.associate = function (models) {
            Brand.hasMany(models.Product,
                {
                    as: "product",
                    foreingKey: "brandId"
                }
            );
        }    
    
    return Brand;
}