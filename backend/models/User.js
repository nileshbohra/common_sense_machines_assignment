const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    subscription: String,
    images: { type: Array, default: [{type: String}] }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);