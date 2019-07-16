const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { 
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        max: 25,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Salt is a string of chars unique to each user.
    salt: String,
    // Hash created by combining password and salt, then applying one-way encryption.
    hash: String,
});

// Set the salt and hash
UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}
// Put password and salt together to create the hash and see if they match.
UserSchema.methods.checkPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}
// Generate a JWT (include data I want to pass)
UserSchema.methods.generateJwt = function() {
    // JWT expires in 7 days
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000),
    }, 'secret');
}

module.exports = mongoose.model('User', UserSchema);