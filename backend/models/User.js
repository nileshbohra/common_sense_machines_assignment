const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    subscription: {
        plan_id: { type: Schema.Types.ObjectId, ref: 'Plans' },
        status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    last_uploaded_at: { type: Date }
}, { timestamps: true });

UserSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

module.exports = mongoose.model('User', UserSchema);