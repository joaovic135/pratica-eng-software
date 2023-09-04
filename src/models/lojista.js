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
    nome: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: { msg: 'Nome não pode ser nulo' },
        notEmpty: { msg: 'Nome não pode ser vazio' }
      },
    },
      senhaHash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Este campo não pode ser vazio' },
        notEmpty: { msg: 'Este campo não pode ser vazio' },
      },
    },
    email:{ type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Email não pode ser nulo'},
        notEmpty:{msg:'Email não pode ser vazio'}
      },
    },
    numero:{ 
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Este campo não pode ser vazio' },
        notEmpty: { msg: 'Este campo não pode ser vazio' },
      },
    },
    descricao:{ type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Este campo não pode ser nulo'},
        notEmpty:{msg:'Este campo não pode ser vazio'}
      },
    },
    termos: DataTypes.STRING,
    file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lojista',
    tableName: 'Lojista'
  });
    Lojista.prototype.isTheUserPassword = async function (senhaInput) {
    return await bcrypt.compare(senhaInput, this.senhaHash);
  };
  return Lojista;
};