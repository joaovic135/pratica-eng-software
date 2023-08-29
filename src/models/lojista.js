'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lojista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lojista.init({
    nome: DataTypes.STRING,
    senha: DataTypes.STRING,
    email: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    descricao: DataTypes.STRING,
    termos: DataTypes.STRING,
    file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lojista',
    tableName: 'Lojista'
  });
  return Lojista;
};