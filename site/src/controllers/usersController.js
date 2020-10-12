module.exports = {
    registro:(req,res)=>{
        res.render('registro')
    },
    registrar:(req,res)=>{
        // simplemente probando
        let usuario = {
            nombre : req.body.regNombre,
            apellido : req.body.regApellido,
        }
        console.log('el apellido es '+ usuario.apellido)
        res.send('hola ' + usuario.nombre)
    },
    login:(req,res)=>{
        res.render('login')
    },
    loguear:(req,res)=>{
        
    }
}

