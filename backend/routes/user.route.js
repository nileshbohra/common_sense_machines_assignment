const router = require('express').Router();
const UserController = require('../controllers/user.controller');

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/create', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;