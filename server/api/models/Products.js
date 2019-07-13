const validator = require("validator");
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    ProductName: {
        type: String,
        trim: String,
        required: [true, 'ProductName cannot be blank.'],
        minlength: [3, 'Must be at least 3 characters.'],
        maxlength: [50, 'Must be less than 50 characters.']
    },
    ProductShotCode: {
        type: String,
        trim: String,
        required: [true, 'ProductShotCode cannot be blank.'],
        unique: [true, 'Duplicat value not allowed.'],
        minlength: [3, 'Must be at least 3 characters.'],
        maxlength: [20, 'Must be less than 50 characters.']
    },
    Category: {
        type: Schema.Types.ObjectId, ref: 'Dictionary',
        required: [true, 'Category cannot be blank.'],
    },
    Price: {
        type: Number,
        required: [true, 'Price cannot be blank.'],
    },
    Quantity: {
        type: Number,
        required: [true, 'Quantity cannot be blank.'],
    },
    Description: {
        type: String,
        trim: String,
        maxlength: [250, 'Must be less than 50 characters.']
    },
    IsBestAchived: {
        type: Boolean,
        default: false
    },
    Origin: {
        type: Schema.Types.ObjectId, ref: 'Dictionary',
        required: [true, 'Origin cannot be blank.'],
    },
    ImageLink: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;