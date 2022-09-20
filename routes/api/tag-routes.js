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
    console.log(req.params);
    const tagData = await Tag.findByPk(req.params.id, {include: [Product]}); //end await
    if (!tagData) {
      res.status(404).json({message: "Tag not found!"});
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
 try {
  console.log(req.body);
  const newTag = req.body.tag_name;
  if (!newTag) {
    res.status(404).json({message: "Missing tag information!"});
  }
  const tagData = await Tag.create({tag_name: newTag});
  if(!tagData) {
    res.status(404).json({message: "Unable to create tag!"});
  }
  res.status(200).json(tagData);
 } catch (error) {
  res.status(500).json(error);
 }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = req.body.tag_name;
    if(!updatedTag) {
      res.status(404).json({messgae: "No new information added!"});
    }
    const id = req.params.id;
    const tagData = await Tag.update({tag_name: updatedTag}, {where: {id}}
      );
      res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error);
  }
 
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Category.destroy({
      where: {
        id: req.params.id
      }
    }); 

    if (!tagData) {
      res.status(404).json({ message: "Tag not found!"});
      return;
    }

    res.status(200).json(tagData); 
  } //end try
  catch (err) {res.status(500).json(err)};
  
});

module.exports = router;
