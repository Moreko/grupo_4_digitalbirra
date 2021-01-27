const { body, validationResult } = require('express-validator');
const db = require('../database/models');

module.exports = [
    body('nombre')
    .isLength({ min: 1 })
    .withMessage('Debe ingresar un nombre de producto'),

    body("descripcion")
    .isLength({ min: 5, max: 140 })
    .withMessage("La descripción debe tener un mínimo de 5 caracteres y un máximo de 140"),

    body("alcohol")
    .isLength({ min: 1 })
    .withMessage("Debe ingresar un número en el campo graduación")
    .bail()
    .isNumeric()
    .withMessage("La graduación debe ser un valor numérico")
    .bail()
    .isLength({ max: 2 })
    .withMessage("La graduación debe tener un máximo de 2 dígitos"),

    body("ibu")
    .isLength({ min: 1 })
    .withMessage("Debe ingresar un número en el campo IBU")
    .bail()
    .isNumeric()
    .withMessage("El IBU debe ser un valor numérico")
    .bail()
    .isLength({ max: 3 })
    .withMessage("El IBU debe tener un máximo de 3 dígitos"),

    body("tamano")
    .isLength({ min: 1 })
    .withMessage("Debe ingresar un número en el campo mililitros")
    .bail()
    .isNumeric()
    .withMessage("Mililitros debe ser un valor numérico")
    .bail()
    .isLength({ max: 4 })
    .withMessage("El IBU debe tener un máximo de 4 dígitos"),

    body("imagen")
    
    .custom(async(value,{req})=>{ 
        if (value != null){
        return true
    }else{
        let producto = await db.Beers.findByPk(req.params.id)
        if (producto != undefined){
            return true
        }else{
            return false
        }
    }
    })
    .withMessage('debes subir una imagen'),

   
    // // .custom(async(value,{req})=>{
    // //     let producto = await db.Beers.findByPk(req.params.id)
    // //     if(producto != undefined){
    // //         return false
    // //     }else{
    // //     const acceptedExtensions = ['.jpg', '.jpeg', '.png'];

    // //     const ext = path.extname(value);

    // //     if (!acceptedExtensions.includes(ext)) {
    // //        return false
    // //     }else{
    // //         return true
    // //     }
    // //     }   
    // // }).withMessage("Debes subir una imagen en formato valido"),

    body("precio")
    .isLength({ min: 1 })
    .withMessage("Debe ingresar un número en el campo precio")
    .bail()
    .isNumeric()
    .withMessage("El precio debe ser un valor numérico")
    .bail()
    .isLength({ max: 4 })
    .withMessage("El precio debe tener un máximo de 4 dígitos")

]