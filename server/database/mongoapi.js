var mongoose = require('./mongoconnect')();
var Item = require('./models/item');
var User = require('./models/user');
var Order = require('./models/order');
var padtDB = mongoose.connection;
//TODO: have some share file
//TODO: split this into itemapi.js and userapi.js, combine with




/**
 * Gets the documents in the 'items' collection using the pre-formatted query
 * @param {object} query 
 * @param {function} cb 
 */
var getItems = (query, cb) => {
    if (padtDB.readyState === 0) {
        cb('DB not yet initialized!');
    } else {
        Item.find(query, (err, data) => {
            if (err) cb(err);
            else cb(null, data);
        })
    }
}

/**
 * Adds a new document to the items collection
 * Items collections should have a unique name constraint
 * 
 * @param {object} toAdd
 * @param {function} cb 
 */
var addItem = (toAdd, cb) => {
    if (!padtDB) {
        cb('DB not yet initialized!');
    } else {
        var newItem = new Item(toAdd);
        newItem.save((err, res) => {
            if (err) cb(err);
            else cb(null, res);
        })
    }
}

/**
 * Updates a targetID doceument using the query parameter
 * @param {string} targetID 
 * @param {object} query 
 * @param {function} cb 
 */
var updateItem = (targetID, query, cb) => {
    if (!padtDB) cb('DB not yet initialized!');
    else {
        //TODO: preprocess update query?
        Item.findOneAndUpdate({ _id: targetID }, query, { new: true, runValidators: true }).then(res => {
            if (res === null) {
                cb('Could not find ID')
                return
            } else {
                cb(null, res)
            }
        }, err => cb(err))
    }
}

/**
 * Deletes a targetID document
 * @param {string} targetID 
 * @param {function} cb 
 */
var deleteItem = (targetID, cb) => {
    if (!padtDB) cb('DB not yet initialized!');
    else {
        Item.deleteOne({ _id: targetID }).then(res => {
            cb(null, res)
        }, err => cb(err))
    }
}

var addUser = (toAdd, cb) => {
    if (!padtDB) cb('DB not yet initialized!');
    else {
        var newUser = new User(toAdd);
        newUser.save((err, res) => {
            if (err) cb(err);
            else cb(null, res);
        })
    }
}

var getUser = (query, cb) => {
    if (!padtDB) cb('DB not yet initialized!');
    else {
        User.find(query, (err, data) => {
            if (err) cb(err);
            else cb(null, data);
        })
    }
}


/**
 * Gets all orders in the system
 * @param {function} cb 
 */
var getOrders = (cb) => {
    if (!padtDB) cb('DB not yet initialized!');
    else {
        Order.find((err, data) => {
            if (err) cb(err);
            else cb(null, data);
        })
    }
}

var addOrder = (order, cb) => {
    if (!padtDB) cb('DB not yet initialized!');
    else {
        var toSave = new Order(order);
        toSave.save((err, data) => {
            if (err) cb(err);
            else cb(null, data);
        })
    }
}


module.exports = {
    getItems,
    addItem,
    updateItem,
    deleteItem,
    getUser,
    addUser,
    getOrders,
    addOrder
};