module.exports =  function(sequelize, dataTypes) {
    let alias = "Subcategory"
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        subcategory: {
            type: dataTypes.STRING,
            allowNull: false
        },
        categoryId: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName: "subcategories",
        timestamps: false
    }
    
    let Subcategory = sequelize.define(alias, cols, config);

   
        Subcategory.associate = function (models) {

            Subcategory.hasMany(models.Product,
                {
                    as: "products",
                    foreingKey: "subcategoryId"
                }
            );
        }

        Subcategory.associate = function (models) {
            Subcategory.belongsTo(models.Category,
                {
                    as: "category",
                    foreingKey: "categoryId"
                }
            );
        }    
    
    return Subcategory;
}