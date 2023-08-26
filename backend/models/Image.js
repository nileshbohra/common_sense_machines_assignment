const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    format: { type: String, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    public_id: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Image', ImageSchema);