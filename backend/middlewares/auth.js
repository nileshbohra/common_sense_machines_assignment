const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({
                status: 'Please login to continue'
            });
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            next();
        }
    } catch (err) {
        res.status(500).json({
            status: 'Internal server error'
        });
    }
}

module.exports = isAuthenticated;