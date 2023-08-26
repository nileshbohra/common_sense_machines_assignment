const router = require('express').Router();
const galleryController = require('../controllers/gallery.controller');

router.post('/:id/upload', galleryController.uploadImage);

module.exports = router;