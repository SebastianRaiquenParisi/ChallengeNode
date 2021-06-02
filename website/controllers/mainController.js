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
    },
    detail:async function (req, res){ 
            try{
                let movieFound = await Movies.findByPk(req.params.id,{include:["actors", "genres"]});
                let movies = await Movies.findAll({include:["actors", "genres"]});
                movieFound.actors = movieFound.actors.map(
                    actor => new Object({actor_id:actor.id, first_name:actor.first_name, last_name:actor.last_name, rating:actor.rating, fav_movie:actor.favorite_movie_id}));
    
                return res.render("./detail", {movieFound:movieFound, actors:movieFound.actors, movies:movies});
            }catch (error){
                console.log(error);
            }	
    }


    
}

module.exports=mainController;