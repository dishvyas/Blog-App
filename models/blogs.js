
const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: String,
    description: String,
    likes: Number,
    image_url: String,
    author: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Blogs', BlogSchema);


// title, description, likes, image_url, author