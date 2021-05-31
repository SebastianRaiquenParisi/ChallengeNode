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
      product_size.belongsTo(models.Actor, {
        foreignKey:"actor_id"
    });
      product_size.belongsTo(models.Movie, {
        foreignKey:"movie_id"
    });
    }
  };
  actor_movie.init({
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    actor_id: DataTypes.INTEGER,
    movie_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'actor_movie',
  });
  return actor_movie;
};