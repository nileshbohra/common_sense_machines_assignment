const userController = {};
const User = require('../models/User');
const bcrypt = require('bcrypt');

userController.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

userController.createUser = async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = new User(req.body);
    await user.save();
    res.json({
        'status': 'User saved'
    });
}

userController.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

userController.updateUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    res.json({ 'status': 'User updated' });
}

userController.deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({
        'status': 'User deleted'
    });
}

module.exports = userController;