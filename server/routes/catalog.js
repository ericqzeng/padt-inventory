var router = require('express').Router();
var db = require('../database/mongoapi')

/**
 * Load default catalog view
 */
router.get('/', (req, res, next) => {
    db.getItems(req.query, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            console.log('getItems done')
            res.send(data);
        }
    })
});

router.post('/addItem', (req, res, next) => {
    db.addItem(req.body, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('added a new item')
            res.send(data);
        }
    });
});

router.post('/updateItem', (req, res, next) => {
    db.updateItem(req.body._id, req.body, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('updated item')
            res.send(data);
        }
    })
})

router.delete('/deleteItem', (req, res, next) => {
    db.deleteItem(req.body._id, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('deleted item')
            res.send(data);
        }
    })
})

//TODO: single updates and deletes

// var validString = (str, tgt) => {
//     if (typeof str !== 'string' || str.trim().length < 1) {
//         throw new Error('Bad string input of ' + tgt);
//     }
//     return str.trim();
// }

// var validNumber = (numb, tgt) => {
//     numb = parseInt(numb) //floors
//     if (typeof numb !== 'number' || !isFinite(numb)) {
//         throw new Error('Bad number input of ' + tgt);
//     }
//     return numb;
// }

// var toValidStringArray = (arr, tgt) => {
//     if (arr === undefined || arr === null) {
//         return new Array();
//     } else if (!Array.isArray(arr)) {
//         //case that arr is a single string 
//         if (arr.trim().length < 1) {
//             return new Array();
//         }
//         return [arr.trim()];
//     } else {
//         //new copy of array with trimmed string values
//         copy = new Array();
//         for (let i of arr) {
//             copy.push(validString(i, tgt));
//         }
//         return copy;
//     }
// }

module.exports = router;
