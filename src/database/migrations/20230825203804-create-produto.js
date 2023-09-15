'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produto', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idLojista:{
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Lojista',
          key: 'id'
        },
        onDelete: 'restrict',
        onUpdate: 'restrict'
      },
      nome: {
        allowNull:false,
        type: Sequelize.STRING
      },
      descricao: {
        allowNull:false,
        type: Sequelize.STRING
      },
      preco: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      categoria: {
        allowNull:false,
        type: Sequelize.STRING
      },
      estoque: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      file: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Produto');
  }
};