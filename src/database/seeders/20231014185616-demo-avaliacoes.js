'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Avaliacoes', [{
      /*idComprador: 1,
      idLojista: 1,
      avaliacao: 5,
      analise: 'Nota 5! Muito bom os produtos. Pode comprar sem preocupações.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      idComprador: 7,
      idLojista: 1,
      avaliacao: 2,
      analise: 'Nota 2! O último produto que comprei dele veio com uma rachadura.',
      createdAt: new Date(),
      updatedAt: new Date()
    },*/
      idComprador: 4,
      idLojista: 2,
      avaliacao: 3,
      analise: 'Nota 3! O produto que recebi não está de acordo com as descrições.',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
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
