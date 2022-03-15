module.exports =  function(sequelize, dataTypes) {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        sku: {
            type:dataTypes.STRING,
            allowNull: false
        },
        subcategoryId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        brandId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        model: {
            type: dataTypes.STRING,
            allowNull: false
        },
        name: {
            type:dataTypes.STRING,
            allowNull: false
        },
        detail: {
            type:dataTypes.TEXT,
            allowNull: false
        },
        description: {
            type:dataTypes.TEXT,
            allowNull: false
        },
        specsheet: {
            type:dataTypes.TEXT,
            allowNull: true
        },
        downloads: {
            type:dataTypes.TEXT,
            allowNull: true
        },
        image: {
            type:dataTypes.TEXT,
            allowNull: false
        },
        price: {
            type:dataTypes.DECIMAL,
            allowNull: false
        },
        discount: {
            type:dataTypes.INTEGER,
            allowNull: true
        },
        stock: {
            type:dataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type:dataTypes.INTEGER,
            allowNull: false
        },
        createdAt:{
            type:dataTypes.DATE,
            allowNull: true
        }
        
    }
    let config = {
        tableName: "products",
        timestamps: true
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {

        Product.belongsTo(models.Subcategory,{
            foreingKey: "subcategoryId"
        });

        Product.hasMany(models.ShoppingCartItem,{
            foreingKey: "productId",
            as:"product"
        });

    }

    return Product;
}