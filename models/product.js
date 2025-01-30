'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
      // A product belongs to a category
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
        onDelete: 'SET NULL', // Keeps products if the category is deleted
      });

      // A product belongs to an admin (who created it)
      Product.belongsTo(models.Admin, {
        foreignKey: 'admin_id',
        as: 'admin',
        onDelete: 'SET NULL', // Keeps products if the admin is deleted
      });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Categories', 
          key: 'id',
        },
        allowNull: true,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Admins',
          key: 'id',
        },
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
    }
  );

  return Product; // Return the correct model name
};
