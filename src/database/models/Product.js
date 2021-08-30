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
        categoryId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        productName: {
            type:dataTypes.STRING,
            allowNull: false
        },
        description: {
            type:dataTypes.STRING,
            allowNull: false
        },
        detail: {
            type:dataTypes.STRING,
            allowNull: false
        },
        image: {
            type:dataTypes.STRING,
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
        Product.belongsTo(models.Category,
            {
                as: "category",
                foreingKey: "categoryId"
            }
        );
    }

    return Product;
}