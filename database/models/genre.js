'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Genre.belongsTo(models.Movie,{
        foreignKey:"genre_id"
      });
    }
  };
  Genre.init({
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    name: DataTypes.STRING,
    ranking: DataTypes.INTEGER,
    active: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};