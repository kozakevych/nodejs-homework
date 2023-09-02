'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        title: 'Product 1',
        description: 'Description for Product 1',
        price: 19.99,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Product 2',
        description: 'Description for Product 2',
        price: 29.99,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
