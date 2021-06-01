const db = require("../database/models");
let Movies = db.Movie;

const mainController = {
    index: async function(req, res){
        try{
            let movies = await Movies.findAll({include:["genres"]});
            return res.render("./index", {movies})
        }catch(error){
            console.log(error);
        }
    }
}

module.exports=mainController;