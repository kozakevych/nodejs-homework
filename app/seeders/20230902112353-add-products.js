'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        title: 'Book',
        description: 'Interesting book',
        price: 19.99,
        id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
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
