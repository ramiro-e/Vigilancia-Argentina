module.exports =  (sequelize, dataTypes) => {
    let alias = "User"
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        companyName:{
            type: dataTypes.STRING,
            allowNull: false
        },
        activity:{
            type: dataTypes.STRING,
            allowNull: false
        },
        cuit:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        web:{
            type: dataTypes.STRING,
            allowNull: false
        },
        phone:{
            type: dataTypes.STRING,
            allowNull: false
        },
        country:{
            type: dataTypes.STRING,
            allowNull: false
        },
        province:{
            type: dataTypes.STRING,
            allowNull: false
        },
        city:{
            type: dataTypes.STRING,
            allowNull: false
        },
        street:{
            type: dataTypes.STRING,
            allowNull: false
        },
        streetAdress:{
            type: dataTypes.STRING,
            allowNull: false
        },
        apartmentFloor:{
            type: dataTypes.STRING,
            allowNull: false
        },
        apartmentUnit:{
            type: dataTypes.STRING,
            allowNull: false
        },
        postalCode:{
            type: dataTypes.STRING,
            allowNull: false
        },
        firstName:{ 
            type: dataTypes.STRING,
            allowNull: false
        },
        lastName:{ 
            type: dataTypes.STRING,
            allowNull: false
        },
        position:{
            type: dataTypes.STRING,
            allowNull: false
        },
        birthDay:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        birthMonth:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        birthYear:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        email:{ 
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        acceptNewsletter:{
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: "users",
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config);
    
    return User;
}