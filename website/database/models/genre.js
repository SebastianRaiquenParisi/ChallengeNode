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
      Genre.hasMany(models.Movie,{
        as:"genre",
        foreignKey:"genre_id"
      });
    }
  };
  Genre.init({
    name: DataTypes.STRING,
    ranking: DataTypes.INTEGER,
    active: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'Genre',
    createdAt:"created_at",
    updatedAt:"updated_at",
    timestamps:true//,
    //paranoid:true
  });
  return Genre;
};