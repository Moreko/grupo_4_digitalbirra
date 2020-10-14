const {validationResult} = require('express-validator')

module.exports = {
    registro:(req,res)=>{
        res.render("registro")
    },
    registrar:(req,res)=>{

        let errors = validationResult(req)
        let oldValues = req.body
        if (errors.isEmpty()){
            res.send('todo bien')
        } else{
            res.render("registro", {registerErrors:errors.errors, oldValues})
        }
    },

    login:(req,res)=>{
        res.render("login")
    },
    loguear:(req,res)=>{
        
    }
}

