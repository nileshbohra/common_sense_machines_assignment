const User = require('../models/User');
const bcrypt = require('bcrypt');
const authController = {};

authController.signup = async (req, res) => {
    try {
        const userPresent = await User.findOne({ email: req.body.email });
        if (userPresent) {
            res.status(403).json({
                status: 'User already exists'
            });
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = new User(req.body);
            await user.save();
            let userObj = {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                subscription: user.subscription,
            }
            res.status(200).json({
                user: userObj
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'Internal server error'
        });
    }
}

authController.login = async (req, res) => {
    let password = req.body.password;
    let email = req.body.email;

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ user: user });
            } else {
                res.status(403).json({
                    status: 'Wrong password'
                });
            }
        } else {
            res.status(404).json({
                status: 'User not found'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'Internal server error'
        });
    }
}

module.exports = authController;