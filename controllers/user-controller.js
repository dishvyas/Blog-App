var mongoose = require('mongoose');
var User = require('../models/users');
var Profile = require('../models/users');
//Create new User
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Field can not be empty"
        });
    }
    // Create a User
    const user = new User({
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email, 
        password: req.body.password,
        bio: req.body.bio,
        gender: req.body.gender,
        age : req.body.age
    });

    // Save user in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the user."
        });
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving user with id " + req.params.userId
        });
    });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "User details can not be empty"
        });
    }

    // Find and update user with the request body
    User.findByIdAndUpdate(req.params.userId, {
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email, 
        password: req.body.password,
        bio: req.body.bio,
        gender: req.body.gender,
        age : req.body.age
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.userId
        });
    });
};

exports.pcreate = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Field can not be empty"
        });
    }
    // Create  UserProfile
    const profile = new Profile({
        full_name: req.body.fname,
        email: req.body.email, 
        gender: req.body.gender,
        age : req.body.age,
        number_of_posts : req.body.totalposts,
        number_of_comments : req.body.totalcomments
    });

    // Save Profile in the database
    profile.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the profile."
        });
    });
};
