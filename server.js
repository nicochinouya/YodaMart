// Import required modules
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // Import sequelize connection

// Create an instance of express app
const app = express();
const PORT = process.env.PORT || 3003;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use(routes);

// Sync sequelize models to the database, then start the server
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  });
