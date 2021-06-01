'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsTo(models.Genre,{
        as:"genres",
        foreignKey:"genre_id"
      })
      Movie.hasOne(models.Actor,{
        foreignKey:"favorite_movie_id"
      })
      Movie.belongsToMany(models.Actor,{
        through:"actor_movie",
        as:"actors",
        foreignKey:"movie_id"
      })
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    awards: DataTypes.INTEGER,
    release_date: DataTypes.DATE,
    length: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
    createdAt:"created_at",
    updatedAt:"updated_at",
    timestamps:true//,
    //paranoid:true
  });
  return Movie;
};