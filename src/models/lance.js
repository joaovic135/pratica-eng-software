'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lances.init({
    valorLance:{
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: 'O valor do lance não pode ser nulo.' },
        notEmpty: { msg: 'O valor do lance não pode ser vazio.' },
        min: { args: [0], msg: 'O valor do lance deve ser positivo.' },
      },
    },
    compradorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: { msg: 'O id do comprador não pode ser nulo.' },
        notEmpty: { msg: 'O id do comprador não pode ser vazio.' },
        min: { args: [0], msg: 'O id do comprador deve ser positivo.' },
      },
    },
    ItemLeilaoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: { msg: 'O id do item do leilão não pode ser nulo.' },
        notEmpty: { msg: 'O id do item do leilão não pode ser vazio.' },
        min: { args: [0], msg: 'O id do item do leilão deve ser positivo.' },
      },
    }
  }, {
    sequelize,
    modelName: 'Lances',
    tableName: 'Lances',
  });
  return Lances;
};