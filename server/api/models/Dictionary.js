const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const dictionarySchema = new Schema({
    Name: {
        type: String,
        trim: String,
        required: [true, 'Name cannot be blank.'],
        unique: [true, 'Duplicat value not allowed.'],
        minlength: [3, 'Must be at least 3 characters.'],
        maxlength: [50, 'Must be less than 50 characters.']
    },
    Type: {
        type: String,
        trim: String,
        required: [true, 'Type cannot be blank.'],
        minlength: [3, 'Must be at least 3 characters.'],
        maxlength: [50, 'Must be less than 50 characters.']
    },
    ShortCode: {
        type: String,
        trim: String,
        required: [true, 'ShortCode cannot be blank.'],
        minlength: [2, 'Must be at least 3 characters.'],
        maxlength: [10, 'Must be less than 10 characters.']
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

const Dictionary = mongoose.model('Dictionary', dictionarySchema);

module.exports = Dictionary;