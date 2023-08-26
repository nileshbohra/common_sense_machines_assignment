require('dotenv').config();
const app = require("./app");
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Successfully connected to DB')).catch(err => console.error(err));


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});