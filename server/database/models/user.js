var mongoose = require('../mongoconnect')();
var bcrypt = require('bcrypt');

var usersSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    yearJoined: { type: String, required: true, trim: true },
    admin: { type: Boolean, required: true },
    pass: { type: String, required: true, trim: true }
})

//TODO: test bcrypt schema methods!
usersSchema.pre('save', function (next) {
    if (!this.isModified('pass')) return next();
    bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(this.pass, salt).then((hash) => {
            this.pass = hash;
            next();
        }, (err) => {
            next(err);
        })
    }, (err) => {
        next(err);
    })
})

usersSchema.methods.validatePass = (input) => {
    bcrypt.compare(input, this.pass).then((res) => {
        console.log(res)
        return res
    }, (err) => {
        console.log(err)
        return err
    })
}

module.exports = mongoose.model('users', usersSchema)
