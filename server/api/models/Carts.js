const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    ProductIds: [{
        ProductId: Schema.Types.ObjectId,
        Quantity: Number
    }],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;