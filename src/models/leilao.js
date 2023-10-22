'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leiloes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Leiloes.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nome é obrigatório' },
        notEmpty: { msg: 'Nome não pode ser vazio' },
      },
    },
    lojistaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Lojista é obrigatório' },
        notEmpty: { msg: 'Lojista não pode ser vazio' },
      },
    },
    produtoId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Produto é obrigatório' },
        notEmpty: { msg: 'Produto não pode ser vazio' },
      },
    },
    dataInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: 'Data de início é obrigatória' },
        notEmpty: { msg: 'Data de início não pode ser vazia' },
      },
    },
    dataFim: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: 'Data de fim é obrigatória' },
        notEmpty: { msg: 'Data de fim não pode ser vazia' },
      },
    },
  }, {
    sequelize,
    tableName: 'Leiloes',
    modelName: 'Leiloes',
  });
  return Leiloes;
};