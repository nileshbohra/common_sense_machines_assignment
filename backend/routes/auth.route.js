const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const isAuthenticated = require('../middlewares/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', isAuthenticated, authController.logout);

module.exports = router;