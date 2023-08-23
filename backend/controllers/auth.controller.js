const User = require('../models/User');

const authController = {};

authController.signup = async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = new User(req.body);
    await user.save();
    res.json({
        'status': 'User saved'
    });
}

authController.login = async (req, res) => {
    let password = req.body.password;
    let email = req.body.email;

    console.log(req.body);

    const user = new User.findOne({ email: email }, (err, user) => {
        return user;
    });

    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            res.json({
                'status': 'User logged'
            });
        } else {
            res.json({
                'status': 'Wrong password'
            });
        }
    } else {
        res.json({
            'status': 'User not found'
        });
    }
}

module.exports = authController;