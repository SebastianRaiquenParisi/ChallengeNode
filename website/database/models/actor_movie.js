'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class actor_movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      actor_movie.belongsTo(models.Actor, {
        foreignKey:"actor_id"
    });
      actor_movie.belongsTo(models.Movie, {
        foreignKey:"movie_id"
    });
    }
  };
  actor_movie.init({
    actor_id: DataTypes.INTEGER,
    movie_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName:"actor_movie",
    modelName: 'actor_movie',
    createdAt:"created_at",
    updatedAt:"updated_at",
    timestamps:true//,
    //paranoid:true
  });
  return actor_movie;
};