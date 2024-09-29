// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    // fields
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    rentPerDay: {
        type: Number,
        required: true
    },
    totalRent: {
        type: Number,
        default: 0
    },
    returnDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['BOOK IS ISSUED', 'BOOK IS RETURNED'],
        required: true
    }
},

    // options
    { collection: 'Transactions' }, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
