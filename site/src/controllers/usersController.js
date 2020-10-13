const {validationResult} = require('express-validator')

module.exports = {
    registro:(req,res)=>{
        res.render("registro")
    },
    registrar:(req,res)=>{

        let errors = validationResult(req)
        if (errors.isEmpty()){
            res.send('todo bien')
        } else{
            res.send(errors.errors)
        }
    },

    login:(req,res)=>{
        res.render("login")
    },
    loguear:(req,res)=>{
        
    }
}

