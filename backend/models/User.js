const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    plan: { type: String, enum: ['free', 'pro'], default: 'free' },
    subscription: {
        stripeId: String,
        status: String
    },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    last_uploaded_at: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);