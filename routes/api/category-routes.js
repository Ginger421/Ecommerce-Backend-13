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

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {id: req.params.id, }
    }) 

    if (!categoryData) {
      res.status(404).json({message: "Category not found!"});
      return;
    }

    res.status(200).json(categoryData);
  } //end try

  catch (err) {res.status(500).json(err)};
  // update a category by its `id` value
}); //end update category by id

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value, include
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    }); 

    if (!categoryData) {
      res.status(404).json({ message: "Category not found!"});
      return;
    }

    res.status(200).json(categoryData); 
  } //end try
  catch (err) {res.status(500).json(err)};
  
}); //end delete

module.exports = router;
