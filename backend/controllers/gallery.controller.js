const User = require('../models/User');
const path = require('path');
const galleryController = {};

galleryController.uploadImage = async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    const { uid, image } = req.body;
    try {
        cloudinary.uploader.upload(image,
            { public_id: path.basename(image) },
            async function (error, result) {
                if (error) {
                    res.status(500).json({
                        status: 'Something went wrong while uploading the image'
                    });
                } else {
                    console.log(result);
                    console.log(uid, image);
                    const id = req.params.id;
                    const user = await User.findById(id);
                    user.images.push(image);
                    await user.save();
                    res.status(200).json({
                        status: 'Image saved'
                    });
                }
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'Internal server error'
        });
    };
}

galleryController.getImages = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user.images);
}

galleryController.deleteImage = async (req, res) => {
}

module.exports = galleryController;