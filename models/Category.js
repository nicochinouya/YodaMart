// Importing necessary modules
const { Model, DataTypes } = require('sequelize');

// Importing sequelize connection
const sequelize = require('../config/connection.js');

// Category model definition
class Category extends Model {}

Category.init(
  {
    // Category ID
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Category name
    category_name:  {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

// Exporting Category model
module.exports = Category;
