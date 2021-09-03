const db = require('../database/models');
let Users = db.User;
        
module.exports = (req,res,next) =>{
       
    res.locals.usuario = false;
    if(req.session.usuario){
        res.locals.usuario = req.session.usuario;
        return next();
    }else if(req.cookies.email){
        let usuario = Users.findOne(usuario => usuario.email == req.cookies.email)
        delete usuario.password
        req.session.usuario = usuario;
        res.locals.usuario = usuario;
        return next();
    } else{
        return next();
    }
}
