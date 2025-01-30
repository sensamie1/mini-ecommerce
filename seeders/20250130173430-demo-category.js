'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Electronics',
        description: 'A category for electronic gadgets and devices.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clothing',
        description: 'A category for fashionable clothing items.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Home Decor',
        description: 'A category for home decoration and furnishing items.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('categories', null, {})
  }
};
