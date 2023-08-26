const mongoose = require('mongoose');
const startupPlans = require('./collections/plans.collection');
const MONGODB_URI = process.env.MONGODB_URI;
const startDb = () => {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(db => console.log('Successfully connected to DB')).catch(err => console.error(err));

    //startup db collections
    startupPlans();
}

module.exports = startDb;