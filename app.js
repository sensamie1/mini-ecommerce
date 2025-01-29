const express = require('express');
const sequelize = require('./config/sequelize');
const apiRoutes = require('./routers/index')


require('dotenv').config()


const port = process.env.PORT || 4001;

const app = express()

app.use(express.json()) // body parser

app.use('/api', apiRoutes)

// app.use('/users', usersRouter)

// app.use('/products', productsRouter)


//Connect to Database with Sequelize
sequelize.authenticate().then(() => {
  console.log('Connected to the db successfully!')
}).catch((err) => {
  console.log('Error connecting to db', err)
})

//Start Server
app.listen(port, () => console.log(`listening on port: ${port}`))