const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const productIds = new Schema({
    ProductId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, 'ProductId cannot be blank.'],
    },
    Quntity: {
        type: Number,
        min: [1, 'This product should have minimum one quntity.'],
        required: [true, 'Quntity cannot be blank.'],
    }
}); 

const cartSchema = new Schema({
    ProductIds: [productIds],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;