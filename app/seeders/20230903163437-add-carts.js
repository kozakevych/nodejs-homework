'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Carts', [
      {
        userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: uuidv4(),
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carts', null, {});
  }
};
