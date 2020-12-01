const {body, validationResult} = require('express-validator');

module.exports = [
    body('nombre')
    .isLength({min:1})
    .withMessage('Debe ingresar un nombre de producto'),

    body("descripcion")
    .isLength({min:5, max:140})
    .withMessage("La descripción debe tener un mínimo de 5 caracteres y un máximo de 140"),

    body("alcohol")
    .isLength({min:1})
    .withMessage("Debe ingresar un número en el campo graduación")
    .bail()
    .isNumeric()
    .withMessage("La graduación debe ser un valor numérico")
    .bail()
    .isLength({max:2})
    .withMessage("La graduación debe tener un máximo de 2 dígitos"),

    body("ibu")
    .isLength({min:1})
    .withMessage("Debe ingresar un número en el campo IBU")
    .bail()
    .isNumeric()
    .withMessage("El IBU debe ser un valor numérico")
    .bail()
    .isLength({max:3})
    .withMessage("El IBU debe tener un máximo de 3 dígitos"),

    body("tamano")
    .isLength({min:1})
    .withMessage("Debe ingresar un número en el campo mililitros")
    .bail()
    .isNumeric()
    .withMessage("Mililitros debe ser un valor numérico")
    .bail()
    .isLength({max:4})
    .withMessage("El IBU debe tener un máximo de 4 dígitos"),

    // body("imagenProducto"),

    body("precio")
    .isLength({min:1})
    .withMessage("Debe ingresar un número en el campo precio")
    .bail()
    .isNumeric()
    .withMessage("El precio debe ser un valor numérico")
    .bail()
    .isLength({max:4})
    .withMessage("El precio debe tener un máximo de 4 dígitos")

]