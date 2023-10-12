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
    IdComprador: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Id do comprador não pode ser nulo'},
        notEmpty:{msg:'Id do comprador não pode ser vazio'}
      }
    },
    IdLojista:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Id do lojista não pode ser nulo'},
        notEmpty:{msg:'Id do lojista não pode ser vazio'}
      }
    }
    
  }, {
    sequelize,
    modelName: 'Seguidores',
  });
  return Seguidores;
};