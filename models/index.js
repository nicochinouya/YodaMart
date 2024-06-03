// Import models
const Product = require('./Product'); // Import Product model
const Category = require('./Category'); // Import Category model
const Tag = require('./Tag'); // Import Tag model
const ProductTag = require('./ProductTag'); // Import ProductTag model

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id' // Set foreign key for Product model
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id' // Set foreign key for Category model
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag, // Set intermediate model for many-to-many relationship
  foreignKey: 'product_id' // Set foreign key for Product model
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, // Set intermediate model for many-to-many relationship
  foreignKey: 'tag_id' // Set foreign key for Tag model
});

// Export models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
