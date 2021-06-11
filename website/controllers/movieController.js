const db = require("../database/models");
let Movies = db.Movie;
let Genres = db.Genre;
let Actors = db.Actor;
let Actor_movies = db.actor_movie;
let moment = require("moment");
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
                include: ["genres", "actors"]
            });
            await Actor_movies.bulkCreate(
				Array.from(req.body.actors_id).map(
				(actor)=>new Object({actor_id:actor,movie_id:newMovie.id})
				));
            return res.redirect("/"); 
        }catch (error){
            console.log(error);
            return res.render("./error404");
        }
    }, 
    delete:async function (req,res){
		try{
			await Movies.destroy({
				where:{
					id: req.params.id	
				}					    
			});
			return res.redirect("/");
		}catch (error){
			console.log(error);
			return res.render("./error404");
		}
	},
    update:async function(req,res){
        try{
            let actors = await Actors.findAll();
            let genres= await Genres.findAll();
            let movieToEdit = await Movies.findByPk(req.params.id,{include:["genres", "actors"]})
            let dateMovie = moment(movieToEdit.release_date).utc().format("YYYY-MM-DD");
            return res.render("./update",{actors,genres, movieToEdit, dateMovie});
        }catch(error){
            console.log(error);
            return res.render("./error404");
        }
    },
    processUpdate:async function(req,res){
        try{
            let errors = validationResult(req);				 
            if(!errors.isEmpty()){							
                let actors = await Actors.findAll();
                let genres= await Genres.findAll();
                let movieToEdit = await Movies.findByPk(req.params.id,{include:["genres", "actors"]})
                let dateMovie = moment(movieToEdit.release_date).utc().format("YYYY-MM-DD");
                return res.render("./update", {
                    actors,
                    genres,
                    movieToEdit,
                    errors: errors.mapped(),
                    dateMovie 		
                });
            }
            await Movies.update({
                ...req.body
            },{
                where:{id:req.params.id},
                include: ["actors", "genres"]
            });
            await Actor_movies.destroy({where:{movie_id:req.params.id}});
            await Actor_movies.bulkCreate(
				Array.from(req.body.actors_id).map(
				(actor)=>new Object({actor_id:actor,movie_id:req.params.id})
				), {updateOnDuplicate:["actor_id","movie_id"]});
            return res.redirect("/");
        }catch(error){
            console.log(error);
            return res.render("./error404");
        }
    }

}
module.exports=movieController;