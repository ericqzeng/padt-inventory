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
            res.status(500).send(err);
        } else {
            console.log('retrieved all orders');
            res.send(data)
        }
    })
})

/**
 * Gets all open order for the given admin user
 */
router.get('/all', (req, res, next) => {
    if (!req.user[0].email) res.status(400).send('No User logged in!')
    if (!req.user[0].admin) res.status(400).send("User not admin!")
    db.getOrders({ fulfilled: 'PENDING' }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
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
        requestor: req.user[0].email,
        fulfilled: 'PENDING'
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log('new order placed');
            res.send(data)
        }
    })
})

router.post('/fulfillOrder', (req, res, next) => {
    if (!req.user[0].email) res.status(400).send('No User logged in!')
    if (!req.user[0].admin) res.status(400).send('User not admin!')
    db.updateOrder(req.body.id, { $set: { fulfilled: req.body.status } }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        } else {
            console.log('order ' + req.body.id + ' updated to ' + req.body.status)
            res.send(data)
        }
    })
})

module.exports = router