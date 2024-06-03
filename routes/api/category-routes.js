const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', (req, res) => {
  console.log('==========READ ALL CATEGORIES==========');
  Category.findAll({
    include: [Product] // Include associated Products
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(error);
      res.status(500).json(err);
    });
});

// GET a category by ID
router.get('/:id', (req, res) => {
  console.log('==========READ CATEGORY BY ID==========');
  Category.findOne({
    where: { id: req.params.id },
    include: [Product] // Include associated Products
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No category found with this id." });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(error);
      res.status(500).json(err);
    });
});

// POST a new category
router.post('/', (req, res) => {
  console.log('==========CREATE CATEGORY==========');
  Category.create(req.body)
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(error);
      res.status(500).json(err);
    });
});

// UPDATE a category by ID
router.put('/:id', (req, res) => {
  console.log('==========UPDATE CATEGORY BY ID==========');
  Category.update(req.body, {
    where: { id: req.params.id }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json({ message: 'Category updated successfully.' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a category by ID
router.delete('/:id', (req, res) => {
  console.log('==========DELETE CATEGORY BY ID==========');
  Category.destroy({
    where: { id: req.params.id }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id.' });
        return;
      }
      res.json({ message: 'Category deleted successfully.' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
