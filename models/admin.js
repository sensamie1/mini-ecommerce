'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association: An Admin belongs to a User
      Admin.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user', 
        onDelete: 'CASCADE'
      });
    }
  }

  Admin.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Admin',
      tableName: 'admins',
    }
  );

  return Admin;
};
