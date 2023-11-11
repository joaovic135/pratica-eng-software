'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Historicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idComprador: {
        type: Sequelize.INTEGER
      },
      idProduto: {
        type: Sequelize.INTEGER
      },
      idLojista: {
        type: Sequelize.INTEGER
      },
      nomeProduto: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      preco: {
        type: Sequelize.FLOAT
      },
      categoria: {
        type: Sequelize.STRING
      },
      quantidade: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Historicos');
  }
};