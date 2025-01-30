const joi = require('joi')
const logger = require('../../../logger');


const validateUserCreation = async (req, res, next) => {
  try {
    logger.info('[ValidateUserCreation] => Validate user creation process started...');
    const schema = joi.object({
      first_name: joi.string().required(),
      last_name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      phone_number: joi.string().required(),
      address: joi.string().required(),
      state: joi.string().required(),
      country: joi.string().required(),
      postal_code: joi.string().required(),
    }).options({ allowUnknown: true }); // sets all unknown true (ignoring checks like terms)

    await schema.validateAsync(req.body, { abortEarly: true })

    logger.info('[ValidateUserCreation] => Validate user creation process done.');
    next()
  } catch (error) {
      console.log(error)
      return res.status(422).json({
        message: error.message,
        success: false
      })
  }
}

const userLoginValidation = async (req, res, next) => {
  try {
    logger.info('[UserLoginValidation] => User login validation process started...');
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    })

    await schema.validateAsync(req.body, { abortEarly: true })
    
    logger.info('[UserLoginValidation] => User login validation process done.');
    next()
} catch (error) {
    return res.status(422).json({
      message: error.message,
      success: false
    })
  }
}

module.exports = {
  validateUserCreation,
  userLoginValidation
}