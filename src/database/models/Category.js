module.exports =  function(sequelize, dataTypes) {
    let alias = "Category"
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category: {
            type: dataTypes.STRING,
            allowNull: false
        },
        path: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName: "categories",
        timestamps: false
    }
    
    let Category = sequelize.define(alias, cols, config);

    Category.associate = function (models) {
        Category.hasMany(models.Subcategory,
            {
                foreingKey: "categoryId"
            }
        );
    }

    return Category;
}