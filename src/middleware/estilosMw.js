const db = require('../database/models')

module.exports = async function(req, res, next) {

    if (req.session.estilos == undefined) {
        const estilos = await db.Estilos.findAll()
        req.session.estilos = estilos
        res.locals.estilos = req.session.estilos
    }

    next();

}