const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/db.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


module.exports = {
    index:(req,res)=>{
        res.render('index')
    },
    faq:(req,res)=>{
        res.render("faq")
    },
    sobre_nosotros:(req,res)=>{
        res.render('sobre_nosotros')
    },

    filtroHome: (req,res)=>{
        let infoUsarioCerveza = req.body;
        if(typeof req.body.tipoCerveza != 'undefined'){
            if(req.body.eleccion == 'mas-vendidas'){
                let masVendidas = products.filter(element => element.categoria == req.body.eleccion);
                res.render('index', {cervezas: masVendidas})
            }
        }
    }
}

