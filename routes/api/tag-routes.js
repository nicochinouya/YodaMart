const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', (req, res) => {
  console.log('========== READ ALL TAGS ==========');
  Tag.findAll({
    include: [Product]
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single tag by id
router.get('/:id', (req, res) => {
  console.log('========== READ TAG BY ID ==========');
  Tag.findOne({
    where: { id: req.params.id },
    include: [Product]
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: "No tag found with this id." });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE a new tag
router.post('/', (req, res) => {
  console.log('========== CREATE TAG ==========');
  Tag.create(req.body)
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE a tag's name by id
router.put('/:id', (req, res) => {
  console.log('========== UPDATE TAG BY ID ==========');
  Tag.update(req.body, {
    where: { id: req.params.id }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json({ message: 'Tag updated successfully.' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a tag by id
router.delete('/:id', (req, res) => {
  console.log('========== DELETE TAG BY ID ==========');
  Tag.destroy({
    where: { id: req.params.id }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id.' });
        return;
      }
      res.json({ message: 'Tag deleted successfully.' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
