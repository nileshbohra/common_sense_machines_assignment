const express = require('express');
const app = express();
const cors = require('cors');
const upload = require('express-fileupload');

app.use(upload());
app.use(cors());
app.use(express.json());
app.use('/api/users', require('./routes/user.route'));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/gallery', require('./routes/gallery.route'));
app.use('/api/subscription', require('./routes/subscription.route'));

module.exports = app;