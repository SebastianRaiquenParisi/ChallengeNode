'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Actor.belongsToMany(models.Movie,{
        through:"actor_movie",
        foreignKey:"actor_id"
      })
    }
  };
  Actor.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    favorite_movie_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Actor',
    createdAt:"created_at",
    updatedAt:"updated_at",
    timestamps:true//,
    //paranoid:true
  });
  return Actor;
};