'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produto.belongsTo(models.Lojista,{ foreignKey: 'id'})
      // define association here
    }
  }
  Produto.init({
    idLojista: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.INTEGER,
    categoria: DataTypes.STRING,
    estoque: DataTypes.INTEGER,
    file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produto',
    tableName: 'Produto'
  });
  return Produto;
};