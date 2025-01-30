'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association: A User has one Admin
      User.hasOne(models.Admin, {
        foreignKey: 'user_id',
        as: 'admin'
      });
      
    }

    // Method to compare passwords during login
    async checkPassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Ensure valid email format
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: DataTypes.STRING,
      address: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      hooks: {
        // Hash password before saving to DB
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  User.prototype.isAdmin = function() {
    return this.role === 'admin';
  }
  
  return User;
};
