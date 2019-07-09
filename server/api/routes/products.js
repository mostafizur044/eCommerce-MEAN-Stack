const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

//Get
router.get('/', productController.getAll);

//Post
router.post('/', productController.postNew);

router.get('/:id', productController.getSingle);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;