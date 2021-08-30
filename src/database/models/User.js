module.exports =  (sequelize, DataTypes) => {
    let alias = "User"
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        companyName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        activity:{
            type: DataTypes.STRING,
            allowNull: false
        },
        cuit:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        web:{
            type: DataTypes.STRING,
            allowNull: false
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false
        },
        country:{
            type: DataTypes.STRING,
            allowNull: false
        },
        province:{
            type: DataTypes.STRING,
            allowNull: false
        },
        city:{
            type: DataTypes.STRING,
            allowNull: false
        },
        street:{
            type: DataTypes.STRING,
            allowNull: false
        },
        streetAdress:{
            type: DataTypes.STRING,
            allowNull: false
        },
        apartmentFloor:{
            type: DataTypes.STRING,
            allowNull: false
        },
        apartmentUnit:{
            type: DataTypes.STRING,
            allowNull: false
        },
        postalCode:{
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName:{ 
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:{ 
            type: DataTypes.STRING,
            allowNull: false
        },
        position:{
            type: DataTypes.STRING,
            allowNull: false
        },
        birthDay:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        birthMonth:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        birthYear:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email:{ 
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        acceptNewsletter:{
            type: DataTypes.INTEGER,
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