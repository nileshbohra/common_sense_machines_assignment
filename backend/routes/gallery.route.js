const router = require('express').Router();
const galleryController = require('../controllers/gallery.controller');

router.post('/:uid/upload', galleryController.uploadImage);
router.get('/:uid', galleryController.getAllImages);
router.get('/:uid/download/:image_id', galleryController.downloadImage);

module.exports = router;