const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    // fields
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
    },
    rentPerDay: {
        type: Number,
        required: true,
        min: 1
    }
},
    // options
    { collection: 'Books' });

module.exports = mongoose.model('Book', bookSchema);
