const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

router.get('/', productController.findAll);

router.post('/', productController.getProduct);

router.post('/create', productController.create);

router.get('/:id', productController.findOne);

router.post('/:id', productController.update);

router.delete('/:id', productController.delete);

module.exports = router;