require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('DB is connected')).catch(err => console.error(err));

app.use(cors());
app.use(express.json());
app.use('/api/users', require('./routes/user.route'));
app.use('/api/auth', require('./routes/auth.route'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});