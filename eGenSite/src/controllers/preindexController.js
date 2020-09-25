const session = require("express-session")


module.exports = {    
    index:(req,res)=>{
        if(undefined == undefined){
        // todavia ando viendo como armar esta parte
            res.render('preindex')
        } else{
            res.redirect('/')
        }
    },
    mostrar:(req,res)=>{
        req.session.mayor = req.body.soyMayor
        res.redirect('/')
    }
}