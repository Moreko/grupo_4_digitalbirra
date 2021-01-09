module.exports = function(req, res, next){
    if(req.session.usuarioLogueado != undefined){
        next()
    }else{
        res.render('login')
    }
}