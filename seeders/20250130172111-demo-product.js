'use strict';

// const product = require('../models/product');

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
    await queryInterface.bulkInsert('products', [
      {
        name: 'Laptop',
        price: 999.90,
        description: 'A high-performance laptop with a powerful processor and a large SSD.',
        stock_quantity: '10',
        category_id: 1,
        admin_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smart TV',
        price: 649.99,
        description: 'A 55-inch 4K Ultra HD Smart TV with built-in streaming apps.',
        stock_quantity: '10',
        category_id: 1,
        admin_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Wireless Headphones',
        price: 199.90,
        description: 'Noise-canceling wireless headphones with long battery life.',
        stock_quantity: '20',
        category_id: 1,
        admin_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jeans',
        price: 99.90,
        description: 'Classic fit jeans made from durable denim fabric.',
        stock_quantity: '15',
        category_id: 2,
        admin_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dress',
        price: 79.90,
        description: 'A stylish knee-length dress perfect for special occasions.',
        stock_quantity: '30',
        category_id: 2,
        admin_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'T-shirt',
        price: 15.90,
        description: 'Comfortable and colorful t-shirt for children.',
        stock_quantity: '20',
        category_id: 2,
        admin_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Table Lamp',
        price: 48.90,
        description: 'Elegant table lamp with a ceramic base and fabric shade.',
        stock_quantity: '10',
        category_id: 1,
        admin_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Wall Art',
        price: 15.90,
        description: 'Canvas wall art featuring a scenic landscape painting.',
        stock_quantity: '5',
        category_id: 3,
        admin_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Throw Pillow',
        price: 20.90,
        description: 'Decorative throw pillow with a geometric pattern.',
        stock_quantity: '15',
        category_id: 3,
        admin_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mattress',
        price: 50.90,
        description: 'Sleeping Equipment.',
        stock_quantity: '5',
        category_id: 3,
        admin_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Table',
        price: 10.90,
        description: 'Dinning Equipment.',
        stock_quantity: '10',
        category_id: 3,
        admin_id: 1,
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
    await queryInterface.bulkDelete('products', null, {})
  }
};
