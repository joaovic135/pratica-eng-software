'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemLeiloes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemLeiloes.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nome é obrigatório' },
        notEmpty: { msg: 'Nome não pode ser vazio' },
      },
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Descrição é obrigatória' },
        notEmpty: { msg: 'Descrição não pode ser vazia' },
      },
    },
    valorInicial: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Valor inicial é obrigatório' },
        notEmpty: { msg: 'Valor inicial não pode ser vazio' },
      },
    },
    valorAtual:{
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Valor atual é obrigatório' },
        notEmpty: { msg: 'Valor atual não pode ser vazio' },
      },
    },
    lojistaId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Lojista é obrigatório' },
        notEmpty: { msg: 'Lojista não pode ser vazio' },
      },
    },
    leilaoId:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lanceId:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ItemLeiloes',
    tableName: 'ItemLeiloes'
  });
  return ItemLeiloes;
};