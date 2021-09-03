const fs = require('fs');
const path = require('path');
const db = require('../database/models');
let usersDatabase = db.User;


// Falta acomodar este middleware para que funcione el recordar usuario
module.exports = (req, res, next) => {
    if (req.session.usuario) {
        next();
    } else {
        res.redirect('/login');
    }
}