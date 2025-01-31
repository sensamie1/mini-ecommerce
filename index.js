const express = require('express');

const rateLimit = require("express-rate-limit");

require('dotenv').config()

const sequelize = require('./config/sequelize');
const apiRoutes = require('./routers/index')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  keyGenerator: (req) => req.ip || req.connection.remoteAddress, // Use IP instead of `X-Forwarded-For`
  message: "Too many requests from this IP, please try again later."
});

const port = process.env.PORT || 4001;

const app = express()

app.use(limiter);

app.use(express.json()) // body parser

app.use('/api', apiRoutes)

// home route
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Success! Welcome to Mini-Ecommerce App.', 
    status: true })
})

app.get('/api/v1', (req, res) => {
  return res.status(200).json({
    message: 'Success! Welcome to Mini-Ecommerce App.', 
    status: true })
})

app.get('*', (req, res) => {
  return res.status(404).json({
    data: null,
    error: 'Route not found'
  })
})

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    data: null,
    error: 'Server Error'
  })
})

//Connect to Database with Sequelize
sequelize.authenticate().then(() => {
  console.log('Connected to the db successfully!')
}).catch((err) => {
  console.log('Error connecting to db', err)
})

//Start Server
app.listen(port, () => console.log(`listening on port: ${port}`))