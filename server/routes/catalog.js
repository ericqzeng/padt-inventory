var express = require('express');
var router = express.Router();
var itemsDB = require('../database/items')

/**
 * Load default catalog view
 */
router.get('/', (req, res, next) => {
    var query = {}
    //TODO: set query based on req params
    itemsDB.getItems(query, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            console.log('getAllItems done')
            res.send(data);
        }
    })
});

router.post('/addItem', (req, res, next) => {
    var toAdd = {
        name: validString(req.body.name, 'item name'),
        type: validString(req.body.type, 'item type'),
        qty: validNumber(req.body.qty, 'item quantity'),
        years: toValidStringArray(req.body.years, 'item years'),
        links: toValidStringArray(req.body.links, 'item links'),
        locations: toValidStringArray(req.body.locations, 'item locations'),
        images: toValidStringArray(req.body.images, 'item images'),
    }
    itemsDB.addItem(toAdd, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('added a new item')
            res.send(data);
        }
    });
});

var validString = (str, tgt) => {
    if (typeof str !== 'string' || str.trim().length < 1) {
        throw new Error('Bad string input of ' + tgt);
    }
    return str.trim();
}

var validNumber = (numb, tgt) => {
    numb = parseInt(numb) //floors
    if (typeof numb !== 'number' || !isFinite(numb)) {
        throw new Error('Bad number input of ' + tgt);
    }
    return numb;
}

var toValidStringArray = (arr, tgt) => {
    if (arr === undefined || arr === null) {
        return new Array();
    } else if (!Array.isArray(arr)) {
        //case that arr is a single string 
        if (arr.trim().length < 1) {
            return new Array();
        }
        return [arr.trim()];
    } else {
        //new copy of array with trimmed string values
        copy = new Array();
        for (let i of arr) {
            copy.push(validString(i, tgt));
        }
        return copy;
    }
}

module.exports = router;
