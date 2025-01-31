const { User, Admin, Product, Category } = require('../models');
const jwt = require('jsonwebtoken');
const logger = require('../logger');
const { Op } = require('sequelize'); 

// require('dotenv').config()

// Create Category
const createCategory = async (req, res) => {
  try {
    logger.info('[CreateCategory] => Create category process started.')

    const categoryFromRequest = req.body;

    // Access the authenticated (bearerToken) user's ID from req.user._id
    const userId = req.user.id;

    const admin = await Admin.findOne({where: {id: userId}})

    if (!admin) {
      return res.status(409).json({
        message: 'Unauthorized! You are not an admin.',
      });
    }

    const existingCategory = await Product.findOne({where: { 
      name: categoryFromRequest.name,
    }});

    if (existingCategory) {
      return res.status(409).json({
        message: 'Category already exists.',
      });
    }
  
    const category = await Category.create({
      name: categoryFromRequest.name,
      description: categoryFromRequest.description
    });
  
    logger.info('[CreateCategory] => Create category process done.')
    return res.status(201).json({
      message: 'Category created successfully.',
      category
    }) 
  } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Server Error',
        data: null
      })
  }

}

// Get All Categories with Pagination and Sorting
const getCategories = async (req, res) => {
  try {
    let { page = 1, limit = 10, sortBy = 'createdAt', order = 'DESC' } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    order = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const offset = (page - 1) * limit;

    const { count, rows: categories } = await Category.findAndCountAll({
      limit,
      offset,
      order: [[sortBy, order]],
    });

    return res.status(200).json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      categories,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};



const createProduct = async (req, res) => {
  try {
    logger.info('[CreateProduct] => Create product process started.')

    const productFromRequest = req.body;

    // Access the authenticated (bearerToken) user's ID from req.user._id
    const userId = req.user.id;
    console.log(userId)

    const admin = await Admin.findOne({where: {user_id: userId}})

    if (!admin) {
      return res.status(409).json({
        message: 'Unauthorized! You are not an admin.',
      });
    }

    const existingProduct = await Product.findOne({where: { 
      name: productFromRequest.name,
      admin_id: admin.id
    }});

    if (existingProduct) {
      return res.status(409).json({
        message: 'Product already exists. Update existing product.',
      });
    }
  
    const product = await Product.create({
      name: productFromRequest.name,
      price: productFromRequest.price,
      description: productFromRequest.description,
      stock_quantity: productFromRequest.stock_quantity,
      category_id: productFromRequest.category_id,
      admin_id: admin.id,
    });
  
    logger.info('[CreateProduct] => Create product process done.')
    return res.status(201).json({
      message: 'Product created successfully.',
      product,
      marketer: `${admin.first_name} ${admin.last_name}`,
      phone_number: `${admin.phone_number}`
    }) 
  } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Server Error',
        data: null
      })
  }

}

// Get Products with Pagination, Search, Filter, Sort
const getProducts = async (req, res) => {
  try {
    logger.info('[GetProducts] => Get products process started.');

    const { page = 1, limit = 10, search, category, minPrice, maxPrice, sortBy, order = 'ASC' } = req.query;
    const offset = (page - 1) * limit;
    
    let whereClause = {};

    // Search products by name
    if (search) whereClause.name = { [Op.iLike]: `%${search}%` };

    // Search category in the database
    let foundCategory = null;
    if (category) {
      foundCategory = await Category.findOne({
        where: { name: { [Op.iLike]: `%${category}%` } },
      });

      // If no category found, return 404 error
      if (!foundCategory) {
        return res.status(404).json({
          message: `Category '${category}' not found.`,
        });
      }

      whereClause.category_id = foundCategory.id;
    }
    if (minPrice || maxPrice) whereClause.price = { [Op.between]: [minPrice || 0, maxPrice || 9999999] };
    
    const products = await Product.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: sortBy ? [[sortBy, order.toUpperCase()]] : [['createdAt', 'DESC']],
    });
    
    if (!products.rows.length) {
      return res.status(404).json({
        message: 'No products found matching your search criteria.',
      });
    }
    logger.info('[GetProducts] => Getproducts process done.');
    return res.status(200).json({
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: page,
      products: products.rows
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    logger.info('[GetProductsById] => Get products by Id process started.');
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    logger.info('[GetProductsById] => Get products by Id process done.');
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    logger.info('[UpdateProduct] => Update product process started.');
    // Access the authenticated (bearerToken) user's ID from req.user._id
    const userId = req.user.id;
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const admin = await Admin.findOne({where: {user_id: userId}})
    
    if (product.admin_id !== admin.id) return res.status(401).json({ message: 'Unauthorised! You are not and admin or the creator of this Product.' });


    await product.update(req.body);
    logger.info('[UpdateProduct] => Update product process done.');
    return res.status(200).json({ message: 'Product updated successfully.', product });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    logger.info('[DeleteProduct] => Delete product process started.');
    // Access the authenticated (bearerToken) user's ID from req.user._id
    const userId = req.user.id;
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const admin = await Admin.findOne({where: {user_id: userId}})

    if (product.admin_id !== admin.id) return res.status(401).json({ message: 'Unauthorised! You are not the creator of this Product.' });

    await product.destroy();
    logger.info('[DeleteProduct] => Delete product process done.');
    return res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};