const validator = require("validator");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    ProductName: {
        type: String,
        trim: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    ProductShotCode: {
        type: String,
        trim: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50
    },
    Category: {
        type: String,
        trim: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        trim: String,
        minlength: 3,
        maxlength: 250
    },
    IsBestAchived: Boolean,
    Origin: {
        type: String,
        trim: String,
        required: true
    }
});

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;