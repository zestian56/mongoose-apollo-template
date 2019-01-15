const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
});

userSchema.set('toObject', {
    virtuals: true
});

userSchema.method('toGraph', function toGraph() {
    return JSON.parse(JSON.stringify(this));
  });

module.exports = mongoose.model('User', userSchema)