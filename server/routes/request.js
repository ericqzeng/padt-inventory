var router = require('express').Router();
var db = require('../database/mongoapi');

router.get('/', (req, res, next) => {
    db.getOrders((err, data) => {
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
    db.addOrder(req.body, (err, data) => {
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