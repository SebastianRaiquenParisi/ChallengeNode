const {check} = require("express-validator");

module.exports=[
    check("email").notEmpty().withMessage("Por favor escriba un email"),
    check("email").isEmail().withMessage("Escriba un email valido"),

    check("password").notEmpty().withMessage("Escriba una contraseña por favor"),
    check("password").isLength({min:8}).withMessage("La contraseña debe tener como minimo 8 caracteres")
]