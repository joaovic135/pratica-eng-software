'use strict';
/** @type {import('sequelize-cli').Migration} */
/*


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

*/

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produto', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idLojista: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      preco: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      categoria: {
        allowNull: false,
        type: Sequelize.STRING
      },
      estoque: {
        allowNull: false,
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

    // Adicione um índice para a coluna idLojista
    await queryInterface.addIndex('Produto', ['idLojista']);

    // Crie a tabela Lojista se ela ainda não existir
    await queryInterface.createTable('Lojista', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull:false,
        type: Sequelize.STRING
      },
      senha: {
        allowNull:false,
        type: Sequelize.STRING
      },
      email: {
        allowNull:false,
        type: Sequelize.STRING,
        unique: true
      },
      numero: {
        allowNull:false,
        type: Sequelize.STRING
      },
      descricao: {
        allowNull:false,
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
    // Primeiro, remova a tabela Produto
    await queryInterface.dropTable('Produto');
    
    // Em seguida, remova a tabela Lojista
    await queryInterface.dropTable('Lojista');
  }
};
