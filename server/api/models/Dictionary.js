const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dictionarySchema = new Schema({
    Name: {
        type: String,
        trim: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50
    },
    Type: {
        type: String,
        trim: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

const Dictionary = mongoose.model('Dictionary', dictionarySchema);

module.exports = Dictionary;