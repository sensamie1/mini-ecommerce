const express = require('express');
const sequelize = require('./config/sequelize');


require('dotenv').config()


const port = process.env.PORT || 4001;

const app = express()

app.use(express.json()) // body parser


// app.use('/users', usersRouter)

// app.use('/products', productsRouter)



sequelize.authenticate().then(() => {
  console.log('Connected to the db successfully!')
}).catch((err) => {
  console.log('Error connecting to db', err)
})


app.listen(port, () => console.log(`listening on port: ${port}`))