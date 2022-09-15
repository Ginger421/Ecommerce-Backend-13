const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//do i need categories after .get or just leave '/'
router.get('/', (req, res) => {
  // find all categories
  Category.findAll({include: [Product]})
  .then(info => {
    res.json(info)
  }) //end .then
  .catch(err => {
    console.log(err)
  }) //end .catch
  // be sure to include its associated Products
});

//route to get a product by id
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({where: {id: req.params.id}, include: [Product]})
  .then(info => {
    res.json(info)
  })
  .catch(err => {
    console.log(err)
  }) //end .catch
  // be sure to include its associated Products
});


//route to create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
  .then(info => {
    res.json(info)
  }) //end .then
  .catch(err => {
    console.log(err)
  }) //end .catch
});

router.put('/:id', (req, res) => {
  Category.put(req.body)
  .then(info => {
    
  })
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
