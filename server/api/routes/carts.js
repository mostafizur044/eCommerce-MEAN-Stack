const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

router.post('/', cartController.create);

router.get('/:id', cartController.getOne);

router.put('/:id', cartController.updateOne);

router.delete('/:id', cartController.deleteOne);

module.exports = router;