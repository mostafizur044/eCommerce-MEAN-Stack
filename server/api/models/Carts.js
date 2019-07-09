const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productIds = new Schema({
    Id: String,
    quntity: Number
}); 

const cartSchema = new Schema({
    ProductIds: [productIds]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;