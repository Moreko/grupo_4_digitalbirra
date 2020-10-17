const session = require("express-session")


module.exports = {    
    index:(req,res)=>{
        if(req.cookies.serMayor == undefined){
            res.render('preindex')
        } else{
            res.redirect('/')
        }
        // este index lo dejo por ahora, despues lo podemos sacar
    },
    mostrar:(req,res)=>{
        res.cookie( 'serMayor', req.body.soyMayor)
        res.redirect('/')
    }
}