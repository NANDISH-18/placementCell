const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0/placementApp');

const db = mongoose.connection;

// If error print error message
db.on('error', console.error.bind(console, 'error in connection DB'));

// if success the print the message
db.once('open',()=> {
    console.log('successfully connect to the database');
})

module.exports = db;

