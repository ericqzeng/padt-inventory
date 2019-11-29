var router = require('express').Router();
var db = require('../database/mongoapi');

/**
 * Gets all orders for the given user in req.user[0] (must be logged in)
 */
router.get('/', (req, res, next) => {
    if (!req.user[0].email) res.status(400).send('No User logged in!')
    db.getOrders({ requestor: req.user[0].email }, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('retrieved all orders');
            res.send(data)
        }
    })
})

router.post('/addOrder', (req, res, next) => {
    if (!req.user[0].email) res.status(400).send('No User logged in!')
    db.addOrder({
        ...req.body,
        requestor: req.user[0].email
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('new order placed');
            res.send(data)
        }
    })
})

module.exports = router