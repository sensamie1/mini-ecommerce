const express = require('express');
const rateLimit = require("express-rate-limit");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();
const sequelize = require('./config/sequelize');
const apiRoutes = require('./routers/index');
const path = require('path');

const app = express();

// // Load Swagger YAML file
// const swaggerDocument = YAML.load('./docs/swagger.yml');
const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'swagger.yml'));


// Trust proxy to allow Express to correctly handle 'X-Forwarded-For' headers
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

const port = process.env.PORT || 4001;

app.use(limiter);
app.use(express.json()); // body parser

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

// Serve Swagger Docs at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss:
    '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
  customCssUrl: CSS_URL,
}));

app.use('/api', apiRoutes);

// Home route
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Success! Welcome to Mini-Ecommerce App.', 
    status: true 
  });
});

app.get('/api/v1', (req, res) => {
  return res.status(200).json({
    message: 'Success! Welcome to Mini-Ecommerce App.', 
    status: true 
  });
});

app.get('*', (req, res) => {
  return res.status(404).json({
    data: null,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    data: null,
    error: 'Server Error'
  });
});

// // Connect to Database with Sequelize
// sequelize.authenticate().then(() => {
//   console.log('Connected to the db successfully!');
// }).catch((err) => {
//   console.log('Error connecting to db', err);
// });

// // Start Server
// app.listen(port, () => console.log(`listening on port: ${port}`));

// **Export app for tests**
module.exports = app;

// **Only start server if not in test mode**
if (process.env.NODE_ENV !== 'test') {
  sequelize.authenticate()
    .then(() => {
      console.log('Connected to the db successfully!');
      app.listen(port, () => console.log(`listening on port: ${port}`));
    })
    .catch((err) => {
      console.error('Error connecting to db', err);
    });
}
