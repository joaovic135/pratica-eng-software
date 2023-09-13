'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Email não pode ser nulo' },
        notEmpty: { msg: 'Email não pode ser vazio' }
      },
    },
    tipoUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Tipo de usuário não pode ser nulo' },
        notEmpty: { msg: 'Tipo de usuário não pode ser vazio' }
      },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Telefone não pode ser nulo' },
        notEmpty: { msg: 'Telefone não pode ser vazio' }
      },
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Endereço não pode ser nulo' },
        notEmpty: { msg: 'Endereço não pode ser vazio' }
      },
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Cidade não pode ser nulo' },
        notEmpty: { msg: 'Cidade não pode ser vazio' }
      },
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'CEP não pode ser nulo' },
        notEmpty: { msg: 'CEP não pode ser vazio' }
      },
    },
  }
  }, {
  sequelize,
  moduleName: 'Usuario',
  tableName: 'Usuario'
});

Usuario.prototype.isTheUserPassword = async function (senhaInput) {
  return await bcrypt.compare(senhaInput, this.senhaHash);
};
return Usuario;
};