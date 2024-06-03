// Import the necessary modules
const { Model, DataTypes } = require('sequelize');

// Import the sequelize connection
const sequelize = require('../config/connection.js');

// Create the Tag model
class Tag extends Model {}

// Initialize the Tag model with the table structure and options
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

// Export the Tag model
module.exports = Tag;
