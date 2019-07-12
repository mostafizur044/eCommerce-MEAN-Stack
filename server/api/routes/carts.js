const express = require('express');
const router = express.Router();
const cartController = require('../controllers/carts');

router.post('/', cartController.create);

router.get('/:id', cartController.findOne);

router.post('/:id', cartController.updateCart);

router.post('/update-item-qty/:id', cartController.updateCartItemQty);

router.post('/delete-item/:id', cartController.deleteCartItem);

router.delete('/:id', cartController.delete);

module.exports = router;