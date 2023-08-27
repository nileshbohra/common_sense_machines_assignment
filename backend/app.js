const express = require('express');
const app = express();
const cors = require('cors');
const upload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const isAuthenticated = require('./middlewares/auth');

app.use(cookieParser());
app.use(upload());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use('/api/users', isAuthenticated, require('./routes/user.route'));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/gallery', isAuthenticated, require('./routes/gallery.route'));
app.use('/api/subscription', isAuthenticated, require('./routes/subscription.route'));

module.exports = app;