var router = require('express').Router();
var db = require('../database/mongoapi');
var bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    db.getUser(req.query, (err, data) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log("getUser done")
            res.send(data)
        }
    })
})

router.post('/addUser', (req, res, next) => {
    db.addUser(req.body, (err, data) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log("new user added")
            res.send(data)
        }
    })
})

router.post('/login', (req, res, next) => {
    //first get user info
    if (req.body.email === undefined || req.body.email.trim().length === 0) {
        console.log('no email');
        res.send("Error: No Email")
        return
    }
    if (req.body.pass === undefined) {
        console.log('no password');
        res.send("Error: No password")
        return
    }
    var query = {
        email: req.body.email
    }
    db.getUser(query, (err, data) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else if (data.length === 0) {
            console.log('User not found');
            res.send('Error: User not found!')
        } else {
            //validate password
            bcrypt.compare(req.body.pass, data[0].pass).then((ok) => {
                if (ok) {
                    console.log('Logged in: ' + req.body.email);
                    //TODO: set session in req.session
                    res.send(ok);
                } else {
                    console.log("Wrong password")
                    res.send("Wrong password")
                }

            }, (err) => {
                console.log(err);
                res.send(err)
            })
        }
    })
})


module.exports = router;