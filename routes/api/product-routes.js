const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products
router.get('/', (req, res) => {
  // Find all products
  // Include associated Category and Tag data
  console.log('========== READ ALL PRODUCTS ==========');
  Product.findAll({
    include: [Category, Tag]
  })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET one product
router.get('/:id', (req, res) => {
  // Find a single product by its `id`
  // Include associated Category and Tag data
  console.log('========== READ PRODUCT BY ID ==========');
  Product.findOne({
    where: { id: req.params.id },
    include: [Category, Tag]
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: "No product found with this id." });
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  console.log('========== CREATE PRODUCT ==========');
  Product.create(req.body)
    .then((product) => {
      // If there are product tags, create pairings in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // If no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// UPDATE product
router.put('/:id', (req, res) => {
  // Update product data
  console.log('========== UPDATE PRODUCT BY ID ==========');
  Product.update(req.body, { where: { id: req.params.id } })
    .then(product => {
      // Find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then(productTags => {
      // Get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // Create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter(tag_id => !productTagIds.includes(tag_id))
        .map(tag_id => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// DELETE product
router.delete('/:id', (req, res) => {
  // Delete one product by its `id` value
  console.log('========== DELETE PRODUCT BY ID ==========');
  Product.destroy({
    where: { id: req.params.id }
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id.' });
        return;
      }
      res.json({ message: 'Product deleted successfully.' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
