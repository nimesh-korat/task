// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    // fields
    uName: {
        type: String,
        required: true,
    },
    uDOB: {
        type: Date,
        required: true,
    },
    uContactNumber: {
        type: String,
        required: true,
    },
    uEmail: {
        type: String,
        required: true,
        unique: true,
    },
    uAddress: {
        type: String,
        required: true,
    },
    uDateofRegistration: {
        type: Date,
        required: true,
    }
},

    // options
    { collection: 'Users' });

module.exports = mongoose.model('User', userSchema);
