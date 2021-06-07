const { check } = require("express-validator");
module.exports=[
    check("name").notEmpty().withMessage("Por favor escriba un nombre"),
    check("name").isLength({min: 3, max:30}).withMessage("El nombre debe tener entre 3 y 30 caracteres"),

    check("email").notEmpty().withMessage("Por favor escriba un email"),
    check("email").isEmail().withMessage("Escriba un email valido"),

    check("password").notEmpty().withMessage("Escriba una contraseña por favor"),
    check("password").isLength({min:8}).withMessage("La contraseña debe tener como minimo 8 caracteres")
      
]
