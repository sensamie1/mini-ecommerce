const express = require('express');
const middleware = require('./users-middleware')
const controller = require('../../../controllers/users-controller')
const globalMiddleware = require('../../../middlewares/global-user-middlewares')

const router = express.Router();


// Create User
router.post('/signup', globalMiddleware.checkBody, middleware.ValidateUserCreation, controller.CreateUser)

// Signin User
router.post('/login', globalMiddleware.checkBody, middleware.UserLoginValidation, controller.UserLogin)

module.exports = router
