var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const ITEMS = 'items';
var padtDB = null;

/**
 * Connect the the url/padt mongoDB
 * TODO: move to some init db js fiel
 */
MongoClient.connect(url, (err, db) => {
    if (err) {
        throw err;
    } else {
        var padt = db.db('padt');
        padtDB = padt
        console.log('DB padt connected to!');
    }
});

/**
 * Gets the documents in the 'items' collection using the pre-formatted query
 * @param {object} query 
 * @param {function} cb 
 */
var getItems = (query, cb) => {
    if (!padtDB) {
        cb('DB not yet initialized!');
    } else {
        padtDB.collection(ITEMS).find(query).toArray((err, res) => {
            if (err) {
                cb(err);
            } else {
                cb(null, res);
            }
        })
    }
}


module.exports = {
    getItems: getItems
};