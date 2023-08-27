const User = require('../models/User');
const bcrypt = require('bcrypt');
const sendToken = require('../utils/sendToken');
const authController = {};

authController.signup = async (req, res) => {
    try {
        const userPresent = await User.findOne({ email: req.body.email });
        if (!!userPresent) {
            res.status(403).json({
                status: 'User already exists'
            });
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = new User(req.body);
            await user.save();

            sendToken(user, 200, res);
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
        const user = await User.findOne({ email: email }).select('+password');
        if (!!user) {
            if (bcrypt.compareSync(password, user.password)) {
                sendToken(user, 200, res);
            } else {
                res.status(403).json({
                    status: 'Please check your email and password'
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

authController.logout = async (req, res) => {
    try {
        res.status(200).cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        }).json({
            status: 'Logged out successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'Internal server error'
        });
    }
}

module.exports = authController;