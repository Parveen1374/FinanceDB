const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/Floww';

mongoose.connect(dbURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

module.exports = db;
