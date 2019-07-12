const express = require('express');
const router = express.Router();
const cartController = require('../controllers/carts');

router.post('/', cartController.create);

router.get('/:id', cartController.findOne);

router.put('/:id/update-item', cartController.updateCartItem);

router.put('/:id/delete-item', cartController.deleteCartItem);

router.delete('/:id', cartController.delete);

module.exports = router;