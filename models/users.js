
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    gender: String,
    bio: String,
    email: String,
    password: String,
    totalposts: Number,
    totalcomments: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);

// email, password, bio, gender, age, first_name, last_name
