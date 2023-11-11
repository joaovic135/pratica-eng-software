'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Historico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Historico.init({
    idComprador: DataTypes.INTEGER,
    idProduto: DataTypes.INTEGER,
    idLojista: DataTypes.INTEGER,
    nomeProduto: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.FLOAT,
    categoria: DataTypes.STRING,
    quantidade: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Historico',
  });
  return Historico;
};