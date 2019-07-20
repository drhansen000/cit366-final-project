const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const accountsRoute = require('./accounts');
const mealsRoute = require('./meals');
const ordersRoute = require('./orders');
const recipeRoute = require('./recipes');

// Create a connection to MongoDb
mongoose.connect('mongodb://localhost:27017/final-project')
.then(() => {
    console.log('Connected to MongoDb');
})
.catch(() => {
    console.log('Connection failed');
});

// Create an instance of an express application
const app = express();

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow other servers to access this server
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

// Use the specified routing logic for each route specified
app.use('/accounts', accountsRoute);
app.use('/meals', mealsRoute);
app.use('/recipes', recipeRoute)
app.use('/orders', ordersRoute);

// Navigate back to the Angular app if the route is empty
app.get('/', (req, res) => {
    res.redirect('http://localhost:4200');
});

// Export app so that other files can use it
module.exports = app;