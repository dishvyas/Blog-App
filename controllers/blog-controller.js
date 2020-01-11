var mongoose = require('mongoose');
var Blog = require('../models/blogs');

//Create new Blog
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Blog content can not be empty"
        });
    }

    // Create a Blog
    const blog = new Blog({
        title: req.body.title || "No blog title", 
        description: req.body.description,
        image_url: req.body.image,
        author: req.body.author
    });

    // Save blog in the database
    blog.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the blog."
        });
    });
};

// Retrieve all blogs from the database.
exports.findAll = (req, res) => {
    Blog.find()
    .then(blogs => {
        res.send(blogs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving blogs."
        });
    });
};

// Find a single blog with a blogId
exports.findOne = (req, res) => {
    Blog.findById(req.params.blogId)
    .then(blog => {
        if(!blog) {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogId
            });            
        }
        res.send(blog);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving blog with id " + req.params.blogId
        });
    });
};

// Update a blog
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Blog content can not be empty"
        });
    }

    // Find and update blog with the request body
    Blog.findByIdAndUpdate(req.params.blogId, {
        title: req.body.title || "No blog title", 
        description: req.body.description,
        image_url: req.body.image,
        likes: req.body.like,
        author: req.body.author
    }, {new: true})
    .then(blog => {
        if(!blog) {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogId
            });
        }
        res.send(blog);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.blogId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Blog.findByIdAndRemove(req.params.blogId)
    .then(blog => {
        if(!blog) {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogId
            });
        }
        res.send({message: "Blog deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogId
            });                
        }
        return res.status(500).send({
            message: "Could not delete blog with id " + req.params.blogId
        });
    });
};

exports.like = (req, res) => {
    Blog.findByIdAndUpdate(req.params.blogId)
    .then(blog => {
        if(!blog) {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogId
            });
        }
        console.log(blog);
        res.send(blog);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Blog not found with id " + req.params.blogId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.blogId
        });
    });  
};