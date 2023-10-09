'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seguidores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Seguidores.init({
    IdComprador: DataTypes.STRING,
    IdLojista: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Seguidores',
  });
  return Seguidores;
};