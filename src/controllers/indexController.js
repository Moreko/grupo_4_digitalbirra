const fs = require('fs');
const path = require('path');
const db = require('../database/models')


const productsFilePath = path.join(__dirname, '../data/dbProducts.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));




module.exports = {
    index: async (req,res)=>{
        if(req.cookies.serMayor == undefined){
            res.render('preindex')
        } else{
            const estilos =  await db.Estilos.findAll()
            let admin = req.session.admin
            res.render('index', { cervezas: products.slice(1,4) ,eleccion: 'DIGITAL BIRRA', admin, estilos})
        }
    },
    faq:(req,res)=>{
        res.render("faq")
    },
    sobre_nosotros:(req,res)=>{
        res.render('sobre_nosotros')
    },

    filtroHome: (req,res)=>{
            if(req.body.eleccion == 'mas-vendidas'){
                let masVendidas = products.filter(element => element.categoria == req.body.eleccion);
                console.log(masVendidas)
                res.render('index', {cervezas: masVendidas, eleccion: req.body.eleccion})
            } else if (req.body.eleccion == 'todas'){
                res.render('index', {cervezas: products, eleccion: req.body.eleccion})
            }

            if(req.body.tipoCerveza != undefined){
                let tipoCerveza = req.body.tipoCerveza
                let cervezaFiltrada = products.filter(element => element.tipo == tipoCerveza)
                res.render('index', {cervezas: cervezaFiltrada, eleccion: tipoCerveza})
            }

        }
        
}

