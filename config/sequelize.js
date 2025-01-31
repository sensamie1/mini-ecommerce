const { Sequelize } = require('sequelize');
const config = require('./config');

// require('dotenv').config()


// const sequelize = new Sequelize(config.development);
const sequelize = new Sequelize(config.production);

module.exports = sequelize;