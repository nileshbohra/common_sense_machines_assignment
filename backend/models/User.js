const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscription: {
        plan_id: { type: Schema.Types.ObjectId, ref: 'Plans' },
        status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    last_uploaded_at: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);