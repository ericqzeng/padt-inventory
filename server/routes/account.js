var router = require('express').Router();
var db = require('../database/mongoapi');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrat = require('passport-local').Strategy;

//TODO: how tf does serialization work lol
passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function (email, done) {
    db.getUser({ email: email }, (err, res) => {
        done(err, res)
    })
    // User.findById(id, function (err, user) {
    //     done(err, user);
    // });
});

//TODO: implement strategy
passport.use(new LocalStrat({
    usernameField: 'email',
    passwordField: 'pwd'
},
    function (email, pass, done) {
        if (email === undefined || email.trim().length === 0) {
            console.log('no email');
            return done(null, false, { message: "Error: No Email" });
        }
        if (pass === undefined) {
            console.log('no password');
            return done(null, false, { message: "Error: No password" });
        }
        db.getUser({ email: email }, (err, data) => {
            if (err) return done(err)
            console.log(data)
            if (data.length === 0) {
                console.log('User not found');
                return done(null, false, { message: 'Error: User not found!' });
            } else {
                //validate password
                bcrypt.compare(pass, data[0].pass).then((ok) => {
                    if (ok) {
                        console.log('Logged in: ' + email);
                        return done(null, data[0])
                    } else {
                        console.log("Wrong password")
                        return done(null, false, { message: "Wrong password" });
                    }

                }, (err) => {
                    console.log(err);
                    return done(err)
                })
            }

        })
    }
));

router.get('/', (req, res, next) => {
    db.getUser(req.query, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        } else {
            console.log("getUser done")
            res.send(data)
        }
    })
})

router.get('/loggedInUser', (req, res, next) => {
    if (!req.user[0]) res.status(500).send('No user logged in!')
    res.send(req.user[0])
})

router.post('/addUser', (req, res, next) => {
    db.addUser(req.body, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json(err)
        } else {
            console.log("new user added")
            res.send(data)
        }
    })
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureFlash: true
}))

// router.post('/login', (req, res, next) => {
//     //first get user info
//     if (req.body.email === undefined || req.body.email.trim().length === 0) {
//         console.log('no email');
//         res.send("Error: No Email")
//         return
//     }
//     if (req.body.pass === undefined) {
//         console.log('no password');
//         res.send("Error: No password")
//         return
//     }
//     var query = {
//         email: req.body.email
//     }
//     db.getUser(query, (err, data) => {
//         if (err) {
//             console.log(err)
//             res.send(err)
//         } else if (data.length === 0) {
//             console.log('User not found');
//             res.send('Error: User not found!')
//         } else {
//             //validate password
//             bcrypt.compare(req.body.pass, data[0].pass).then((ok) => {
//                 if (ok) {
//                     console.log('Logged in: ' + req.body.email);
//                     //TODO: set session in req.session
//                     res.send(ok);
//                 } else {
//                     console.log("Wrong password")
//                     res.send("Wrong password")
//                 }

//             }, (err) => {
//                 console.log(err);
//                 res.send(err)
//             })
//         }
//     })
// })


module.exports = router;