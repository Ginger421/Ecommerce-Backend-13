const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags and associated Product data
  try {
    const tagData = await Tag.findAll({ include: [ Product ]});
    if (!tagData) {
      res.status(404).json( {message: "Tag not found!"});
      return;
    } //end of if statement
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` associated Product data
  try {
    const tagData = await Tag.findByPk({ include: [ Product ]});
    if (!tagData) {
      res.status(404).json({message: "Tag not found!"});
    }
  } catch (error) {
    
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
