const express = require('express');
const middleware = require('../products/products-middleware')
const controller = require('../../../controllers/products-controller')
const globalMiddleware = require('../../../middlewares/global-user-middlewares')

const router = express.Router();


// Get Categories
router.get('/categories', controller.getCategories);

// Get all Products
router.get('/', controller.getProducts);

// Get a single Product by ID
router.get('/:id', controller.getProductById);

// Signed in Admin Create Category
router.post('/category/create', globalMiddleware.checkBody, globalMiddleware.bearerTokenAuth, middleware.createProductValidation, controller.createCategory)

// Signed in Admin Create Product
router.post('/create', globalMiddleware.checkBody, globalMiddleware.bearerTokenAuth, middleware.createProductValidation, controller.createProduct)

// Signed-in Admin Update Product
router.put('/:id', globalMiddleware.checkBody, globalMiddleware.bearerTokenAuth, middleware.createProductValidation, controller.updateProduct);

// Signed-in Admin Delete Product
router.delete('/:id', globalMiddleware.bearerTokenAuth, controller.deleteProduct);

module.exports = router
