module.exports = function(req, res, next){
    // // Logica para que chequee si hay administrador

    // // Por defecto, no hay administrador
    // res.locals.usuarioAdmin = false;

    // // Si existe en session el usuario, lo mando a locals para compartirlo con las vistas
    // if(req.session.admin) {
    //     res.locals.usuarioAdmin = req.session.admin
    // } 

    next();

}