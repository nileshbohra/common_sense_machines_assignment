require('dotenv').config();
const app = require("./app");
const PORT = process.env.PORT || 3001;
const cloudinary = require('cloudinary').v2;
const startDb = require('./startup/startdb');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

startDb();

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});