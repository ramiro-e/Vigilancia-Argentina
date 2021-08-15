const path = require('path');
const fs = require("fs")

module.exports = {
    login: (req,res) => {
        res.render(path.resolve(__dirname, '../views/user/login'),{
            title: "Ingresar | Vigilancia Argentina"
        })
    },
    register: (req,res) => {
        res.render(path.resolve(__dirname, '../views/user/register'),{
            title: "Registrarse | Vigilancia Argentina"
        })
    }
}