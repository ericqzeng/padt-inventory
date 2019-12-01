var mongoose = require('mongoose');
var url = "ds251158.mlab.com:51158/heroku_jnj6jb6x";

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