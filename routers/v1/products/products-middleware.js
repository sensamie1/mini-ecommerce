const Joi = require('joi');
const logger = require('../logger');

const CreateProductValidation = async (req, res, next) => {
  try {
    logger.info('[CreateProductValidation] => Create product validation process started...');

    const schema = Joi.object({
      name: Joi.string().min(3).max(255).required()
        .messages({
          'string.empty': 'Product name is required',
          'string.min': 'Product name must be at least 3 characters long',
          'string.max': 'Product name cannot exceed 255 characters'
        }),
      price: Joi.number().positive().required()
        .messages({
          'number.base': 'Price must be a valid number',
          'number.positive': 'Price must be greater than zero',
          'any.required': 'Price is required'
        }),
      description: Joi.string().max(500).allow(null, '')
        .messages({
          'string.max': 'Description cannot exceed 500 characters'
        }),
      stock_quantity: Joi.number().integer().min(0).required()
        .messages({
          'number.base': 'Stock quantity must be a number',
          'number.integer': 'Stock quantity must be an integer',
          'number.min': 'Stock quantity cannot be negative',
          'any.required': 'Stock quantity is required'
        })
    });

    await schema.validateAsync(req.body, { abortEarly: false });

    logger.info('[CreateProductValidation] => Create product validation process done.');
    next();
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(err => err.message) // Collects all errors
    });
  }
};

module.exports = {
  CreateProductValidation
};
