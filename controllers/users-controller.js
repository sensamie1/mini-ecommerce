const { User, Admin } = require('../models');

const jwt = require('jsonwebtoken');
const logger = require('../logger');

require('dotenv').config()

//Controller for User Signup
const createUser = async (req, res) => {
  try {
    logger.info('[CreateUser] => Create user process started.')
    const userFromRequest = req.body

    const existingEmailUser = await User.findOne({ where: { email: userFromRequest.email } });
    if (existingEmailUser) {
      return res.status(409).json({
        message: 'User already exists',
      });
    }

    // Check if email belongs to admin domain (assign admin role)
    let role = 'user';
    if (userFromRequest.email === 'sen4word@gmail.com' || userFromRequest.email.endsWith('@scello.com')) {
      role = 'admin';
    }
  
    //Create a user entity
    const user = await User.create({
      first_name: userFromRequest.first_name,
      last_name: userFromRequest.last_name,
      email: userFromRequest.email,
      password: userFromRequest.password,
      phone_number: userFromRequest.phone_number,
      address: userFromRequest.address,
      state: userFromRequest.state,
      country: userFromRequest.country,
      postal_code: userFromRequest.postal_code,
      role: role
    });

    //Create an Amdin entity
    if(role == 'admin') {
      const admin = await Admin.create({
        first_name: userFromRequest.first_name,
        last_name: userFromRequest.last_name,
        email: userFromRequest.email,
        phone_number: userFromRequest.phone_number,
        user_id: user.id
      });
    }
  
    //Assign jwt token
    const token = await jwt.sign({
      email: user.email, 
      id: user.id, 
      first_name: user.first_name, 
      last_name: user.last_name}, process.env.JWT_SECRET, { expiresIn: '1h' })

    // Remove password from the response
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;

    logger.info('[CreateUser] => Create user process done.')
    return res.status(201).json({
      message: 'User created successfully.',
      user: userWithoutPassword,
      token
    }) 
  } catch (error) {
      logger.error(`[CreateUser] Error: ${error.message}`);
      console.log(error)
      return res.status(500).json({
        message: `Server Error: ${error.message}`,
        data: null
      })
  }

}

//Controller for User Login
const userLogin = async (req, res) => {
  try {
    logger.info('[UserLogin] => User login process started')
    const userFromRequest = req.body

    const user = await User.findOne({ where: { email: userFromRequest.email } });
  
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      }) 
    }
  
    const validPassword = await user.checkPassword(userFromRequest.password)

    if (!validPassword) {
      return res.status(422).json({
        message: 'Email or password is not correct',
      }) 
    }
  
    //Assign jwt token
    const token = await jwt.sign({
      email: user.email, 
      id: user.id, 
      first_name: user.first_name, 
      last_name: user.last_name}, process.env.JWT_SECRET, { expiresIn: '1h' })

    // Remove password from the response
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;

    logger.info('[UserLogin] => User login process done')
    return res.status(200).json({
      message: 'User login successful',
      user: userWithoutPassword,
      token
    })
  } catch (error) {
      logger.error(error.message);
      console.log(error)
      return res.status(500).json({
        message: 'Server Error',
        data: null
      })
  }
}

module.exports = {
  createUser,
  userLogin
}