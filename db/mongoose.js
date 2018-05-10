const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let connection = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/emle';
mongoose.connect(connection);

module.exports = {mongoose};