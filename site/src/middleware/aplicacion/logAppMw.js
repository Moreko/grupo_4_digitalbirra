module.exports = function(req, res, next){
    // Logica para que chequee si esta logeado el usuario

    // Por defecto, no hay un usuario logueado
    res.locals.usuarioActivo = false;

    // Si existe en session el usuario, lo mando a locals para compartirlo con las vistas
    if(req.session.usuarioLogueado) {
        res.locals.usuarioActivo = req.session.usuarioLogueado
    } else if(req.cookies.recordarme) {
        req.session.usuarioLogueado = req.cookies.recordarme
        res.locals.usuarioActivo = req.session.usuarioLogueado
    }

    next();

}
