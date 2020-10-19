const {body, validationResult} = require('express-validator');

module.exports = function(req, res, next){
        
        if(req.session.admin) {
            next();
        } else {
            let loginErrors = [{
                msg:'Para modificar, crear y borrar tenés que ser Admin o el amigo de la estrella'
            }]
           res.render('login',{loginErrors})
        }

    }