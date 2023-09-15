'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Produto', [{
      idLojista: 1,
      nome: 'produto Teste',
      descricao: 'descricao do produto teste',
      preco: '100',
      categoria: "categoria teste",
      estoque:'10',
      file: 'file teste',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
