const User = require('../models/User');
const path = require('path');
const galleryController = {};
const cloudinary = require('cloudinary').v2;
const parser = require('../utils/dataUri.utils').parser;
const Image = require('../models/Image');
const async = require('async');

galleryController.uploadImage = async (req, res) => {
    if (!!req.files) {
        const { uid } = req.params;
        const { image } = req.files;
        if (!!image && !!uid) {
            try {
                const user = await User.findById(uid);
                if (!user) {
                    res.status(404).json({
                        status: 'User not found'
                    });
                } else {
                    if (user.plan == "free" && (!!user.last_uploaded_at && user.last_uploaded_at > Date.now() - 1000 * 60 * 60 * 1)) {
                        res.status(403).json({
                            status: 'You can only upload one image per hour or you can upgrade to pro plan'
                        });
                    } else {
                        const parsedImage = parser(image);
                        cloudinary.uploader.upload(parsedImage.content, { folder: "common_sense_machines", public_id: image.name },
                            async function (error, result) {
                                if (!!error) {
                                    res.status(500).json({
                                        status: 'Something went wrong while uploading the image'
                                    });
                                } else {
                                    const user = await User.findById(uid);
                                    const saveImage = new Image({
                                        user_id: uid,
                                        name: image.name,
                                        format: result.format,
                                        height: result.height,
                                        width: result.width,
                                        url: result.secure_url,
                                        size: result.bytes,
                                        public_id: result.public_id
                                    });

                                    const imageId = await saveImage.save();
                                    user.images.push(imageId._id);
                                    user.last_uploaded_at = Date.now();
                                    await user.save();
                                    res.status(200).json({
                                        status: 'Image Uploaded'
                                    });
                                }
                            });
                    }
                }
            } catch (err) {
                res.status(500).json({
                    status: 'Internal server error'
                });
            };
        }
    } else {
        res.status(400).json({
            status: 'No image provided'
        });
    }
}

galleryController.getAllImages = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await User.findById(uid);

        if (!user) {
            res.status(404).json({
                status: 'User not found'
            });
        } else {
            let allImages = [];

            async.each(user.images, async (image_id) => {
                const imageObj = await Image.findById(image_id);
                if (!imageObj) {
                    user.images.pull(image_id);
                    await user.save();
                } else {
                    if (imageObj.user_id !== uid) {
                        user.images.pull(image_id);
                        await user.save();
                    } else {
                        allImages.push(imageObj);
                    }
                }
            }, (err) => {
                if (err) {
                    res.status(500).json({
                        status: 'Internal server error'
                    });
                } else {
                    res.status(200).json({
                        images: allImages
                    });
                }
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'Internal server error'
        });
    }
}

galleryController.deleteImage = async (req, res) => {
    const { uid, image_id } = req.params;
    try {
    } catch (err) {
        res.status(500).json({
            status: 'Internal server error'
        });
    }
}

module.exports = galleryController;