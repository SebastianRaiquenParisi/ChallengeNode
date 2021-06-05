const db = require("../database/models");
let Movies = db.Movie;
let Genres = db.Genre;
let Actors = db.Actor;
let Actor_movies = db.Actor_movie;
const {validationResult} = require("express-validator")

const movieController = {

    detail:async function (req, res){ 
        try{
            let movieFound = await Movies.findByPk(req.params.id,{include:["actors", "genres"]});
            let movies = await Movies.findAll({include:["actors", "genres"]});
            movieFound.actors = movieFound.actors.map(
                actor => new Object({actor_id:actor.id, first_name:actor.first_name, last_name:actor.last_name, rating:actor.rating, fav_movie:actor.favorite_movie_id}));

            return res.render("./detail", {movieFound:movieFound, actors:movieFound.actors, movies:movies});
        }catch (error){
            console.log(error);
            return res.render("./error404");
        }	
    },
    create:async (req,res)=>{
        try{
            let actors = await Actors.findAll();
            let genres= await Genres.findAll();
            return res.render("./create",{actors,genres});
        }catch (error){
            console.log(error);																			
            return res.render("./error404");
        }
    },
    storage: async function (req,res){
        try{  									
            let errors = validationResult(req);				 
            if(!errors.isEmpty()){							
                let actors = await Actors.findAll();
                let genres= await Genres.findAll();
                return res.render("./create", {
                    actors,
                    genres,
                    errors: errors.mapped(),
                    oldData: req.body 		
                });
            }
            
            let newMovie = await Movies.create({
                ...req.body
            },{
                include: ["actors, genre"]
            });
            await Actor_movies.bulkCreate(
                Array.from(req.body.size).map(
                (size,index)=>new Object({size_id:size,product_id:newproduct.id, quantity:req.body.quantity[index]})
                ));
            return res.redirect("/"); 
        }catch (error){
            console.log(error);
            return res.render("./products/error404");
        }
    }, 

}
module.exports=movieController;