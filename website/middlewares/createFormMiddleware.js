const {check} = require("express-validator");
module.exports=[
    check("title").notEmpty().withMessage("La pelicula debe tener un titulo"),
    check("title").isLength({min:2, max:30}).withMessage("El titulo de la pelicula debe tener entre 2 y 30 caracteres"),

    check("rating").notEmpty().withMessage("La pelicula debe tener un rating"),
    check("rating").isFloat({min:1, max:10}).withMessage("El rating debe ser un numero del 1 al 10 (con . para ser decimal)"),

    check("awards").notEmpty().withMessage("Se debe especificar la cantidad de premios que tiene la pelicula"),
    check("awards").isInt().withMessage("La cantidad de premios debe ser un numero entero"),

    check("release_date").notEmpty().withMessage("La pelicula debe tener una fecha de lanzamiento"),

    check("genre_id").notEmpty().withMessage("La pelicula debe tener un genero"),

    check("actors_id").notEmpty().withMessage("La pelicula debe contener por lo menos un actor o actriz"),


]