var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/padt";

module.exports = () => {
    if (mongoose.connection.readyState === 0) {
        mongoose.connect(url);
        mongoose.connection.on('error', () => {
            console.log('Error connecting to DB');
        })
        mongoose.connection.on('open', () => {
            console.log('Connected to padt DB');
        })
    }
    return mongoose;
}