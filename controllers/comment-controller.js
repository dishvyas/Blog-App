var mongoose = require('mongoose');
var Comment = require('../models/comments');

//Create a new Comment
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Comment content can not be empty"
        });
    }

    // Create a comment
    const comment = new Comment({
        commented_by: req.body.commentedby, 
        blog_id: req.body.blogId,
        comment_string: req.body.comments
    });

    // Save comment in the database
    comment.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while adding the comment."
        });
    });
};

