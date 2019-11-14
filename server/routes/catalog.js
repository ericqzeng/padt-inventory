var express = require('express');
var router = express.Router();
var itemsDB = require('../database/items')

/**
 * Load default catalog view
 */
router.get('/', function (req, res, next) {
    itemsDB.getItems({}, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            console.log('getAllItems done')
            res.send(data);
        }
    })
});

module.exports = router;
