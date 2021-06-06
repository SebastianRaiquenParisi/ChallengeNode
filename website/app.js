const express = require("express");
const path = require("path");
const app = express();
const db = require("./database/models");
const methodOverride = require("method-override")
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
const session = require("express-session");
const cookies= require("cookie-parser");

app.use(methodOverride('_method'));
app.use(session({secret:"responsabilidad", resave:false, saveUninitialized:false}));
app.use(cookies());
app.use(userLoggedMiddleware);
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.listen(3000, ()=> 
    console.log("Servidor corriendo en puerto 3000")
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/mainRoutes");
const movieRouter = require("./routes/movieRoutes");
const userRouter = require("./routes/userRoutes");

app.use("/", indexRouter);
app.use("/movies", movieRouter);
app.use("/users", userRouter);
