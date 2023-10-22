'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemLeiloes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.TEXT
      },
      valorInicial: {
        type: Sequelize.DECIMAL
      },
      valorAtual: {
        type: Sequelize.DECIMAL
      },
      lojistaId:{
        type: Sequelize.INTEGER,
      },
      leilaoId:{
        type: Sequelize.INTEGER,
      },
      lanceId:{
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('ItemLeiloes');
  }
};