const path = require('path')

module.exports = (req, res, next) => {
    if (parseInt(req.session.usuario.role) >= 2) {
        next();
    } else {
        res.render(path.resolve(__dirname, `../views/webs/accesoDenegado`));
        console.log(req.session.usuario.role)
    }
}