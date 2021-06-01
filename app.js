const express = require("express");
const path = require("path");
const app = express();
const db = require("./database/models");
const session = require("express-session");

//convertir el metodo put a un get ? no obvio que no : dale bro
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.listen(3000, ()=> 
    console.log("Servidor corriendo en puerto 3000")
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/mainRoutes");

app.use("/", indexRouter);
